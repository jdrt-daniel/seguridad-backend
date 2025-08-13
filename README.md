# Backend Base - NestJS

<p>
  <a href="./">
    <img src="https://img.shields.io/badge/version-v1.0.0-blue" alt="Versión">
  </a>
  <a href="./LICENSE">
      <img src="https://img.shields.io/static/v1?label=license&message=LPG%20-%20Bolivia&color=green" alt="Licencia: LPG - Bolivia" />
  </a>
</p>

## Recomendaciones

Para usar este proyecto como base de un nuevo proyecto, debe seguir los siguientes pasos:

- Clonar el proyecto en local

```
git remote add origin https://github.com/jdrt-daniel/nestjs-backend-base
```

- Restaurar la base de datos de la carpeta `database/database-pg.sql`

## Tecnologías

| Nombre      | Descripción                                                       | Sitio Web                  |
| ----------- | ----------------------------------------------------------------- | -------------------------- |
| NestJS      | Framework de Node.js con TypeScript para aplicaciones escalables. | https://nestjs.com         |
| Jest        | Framework de prueba de JavaScript de fácil uso.                   | https://jestjs.io          |
| Passport.js | Middleware de autenticación para Node.js.                         | http://www.passportjs.org  |
| OpenAPI     | Estándar de descripción de API para documentación.                | https://www.openapis.org   |
| TypeORM     | ORM para TypeScript y JavaScript para bases de datos.             | https://typeorm.io         |
| PinoJs      | Registro eficiente para aplicaciones Node.js.                     | https://getpino.io         |
| Casbin      | Biblioteca de control de acceso flexible.                         | https://casbin.org         |
| PostgreSQL  | Sistema de gestión de bases de datos relacional.                  | https://www.postgresql.org |
| Docker      | Plataforma de contenedorización para empaquetar aplicaciones.     | https://www.docker.com     |

## Funcionalidades

- Autenticación JWT
- Autenticación con Ciudadanía Digital
- Refresh Token
- Autorización (Roles, Módulos, Usuarios, Permisos)
- Paramétricas
- Clientes para Interoperabilidad (SEGIP, SIN)
- Cliente para Mensajería Electrónica
- Proveedores de:
  - Logger
  - Reportes
  - Manejo de errores

## Documentación

Documentación relacionada con el proyecto:

1. [Instalación y Configuración](INSTALL.md)
2. [Arquitectura](/docs/arquitectura.md)
3. [Documentación de APIS](/docs/openapi.yaml)
4. [Documentación de Permisos](/docs/permisos.md)

## Instrucciones

1. Clonar el proyecto de

   ```bash
   $ pnpm install
   ```

2. Copiar el archivo de configuración de ejemplo `.env.example` a `.env`

3. Modificar los valores de configuración en `.env`

4. Restaurar la base de datos de la carpeta `database/database-pg.sql`, este ya contiene la estructura de la base de datos

5. Iniciar el servidor de desarrollo

   ```bash
   $ pnpm start
   ```

6. Iniciar el servidor de desarrollo en modo de producción

   ```bash
   $ pnpm start:prod
   ```

7. Iniciar el servidor de desarrollo en modo de desarrollo

   ```bash
   $ pnpm start:dev
   ```

## Changelog

1. Generar tag y archivo CHANGELOG. `patch (0.0.x) | minor (0.x.0) | major (x.0.0)`

   ```bash
   $ npm run release -- --release-as patch
   ```

2. Guardar los tags generados

   ```bash
   $ git push --follow-tags origin master
   ```

## Colaboradores

- Daniel Rafael Torrez ([@jdrt-daniel](https://github.com/jdrt-daniel))

## Licencia

[LGP-Bolivia](LICENSE).

## Información de contacto

- jdrt.1012@gmail.com
