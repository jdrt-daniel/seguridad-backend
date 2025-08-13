import { LoggerService } from '@/core/logger'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  protected logger = LoggerService.getInstance()

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  validate(payload: PayloadType): PassportUser {
    return {
      id: payload.id,
      roles: payload.roles,
      idRol: payload.idRol,
      rol: payload.rol,
      exp: payload.exp,
      iat: payload.iat,
    }
  }
}
