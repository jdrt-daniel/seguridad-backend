import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express-serve-static-core';
import { Issuer } from 'openid-client';
import { CookieService } from '@/common/lib/cookie.service';
import { BaseController } from '@/common/base';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { OidcAuthGuard } from '../guards/oidc-auth.guard';
import { AuthenticationService } from '../service/authentication.service';
import { RefreshTokensService } from '../service/refreshTokens.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { AuthDto, CambioRolDto } from '../dto/index.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Autenticación')
export class AuthenticationController extends BaseController {
  constructor(
    private autenticacionService: AuthenticationService,
    private refreshTokensService: RefreshTokensService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {
    super();
  }

  @ApiOperation({ summary: 'API para autenticación con usuario y contraseña' })
  @ApiBody({ description: 'Autenticación de usuarios', type: AuthDto })
  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new BadRequestException(
        `Es necesario que esté autenticado para consumir este recurso.`,
      );
    }
    const result = await this.autenticacionService.autenticar(req.user);

    /* sendRefreshToken(res, result.refresh_token.id); */
    const refreshToken = result.refresh_token.id;
    return res
      .cookie(
        this.configService.get('REFRESH_TOKEN_NAME') || '',
        refreshToken,
        CookieService.makeConfig(this.configService),
      )
      .status(200)
      .send({ finalizado: true, mensaje: 'ok', datos: result.data });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('cambiarRol')
  async changeRol(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CambioRolDto,
  ) {
    if (!req.user) {
      throw new BadRequestException(
        `Es necesario que esté autenticado para consumir este recurso.`,
      );
    }
    const result = await this.autenticacionService.cambiarRol(req.user, body);

    const refreshToken = result.refresh_token.id;
    return res
      .cookie(
        this.configService.get('REFRESH_TOKEN_NAME') || '',
        refreshToken,
        CookieService.makeConfig(this.configService),
      )
      .status(200)
      .send({ finalizado: true, mensaje: 'ok', datos: result.data });
  }

  @ApiOperation({ summary: 'API para logout digital' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async salirCiudadania(@Req() req: Request, @Res() res: Response) {
    await this.logoutCiudadania(req, res);
  }

  async logoutCiudadania(
    @Req() req: Request,
    @Res() res: Response,
    mensaje = '',
  ) {
    const jid = req.cookies.jid || '';
    if (jid) {
      await this.refreshTokensService.removeByid(jid);
    }

    req.session.destroy(() => ({}));

    res.clearCookie('connect.sid');
    res.clearCookie('jid', jid);
    const userDataString = Buffer.from(
      `${req.headers.authorization}`.split('.')[1],
      'base64',
    ).toString();

    const usuario = JSON.parse(userDataString);

    this.logger.audit('authentication', {
      mensaje: 'Salió del sistema',
      metadata: { usuario: usuario.id },
    });

    return res.status(200).json({
      url: '/login',
    });
  }
}
