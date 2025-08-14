import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from '@/common/validation'

export class CambioRolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  idRol: string
}

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  token: string
}

export class AuthDto {
  @ApiProperty({
    example: 'ADMINISTRADOR',
    description: 'Usuario',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  usuario: string

  @ApiProperty({
    example: 'MTIz',
    description: 'Contraseña',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  contrasena: string
}
