# Proyecto base Backend

## Estructura de directorios

```
├─database                      # directorio con los scripts para crear la base de datos
├─docs                          # directorio con la documentacion del proyecto
├─public                        # directorio que se expone de forma pública al levantar el servicio (contiene logos e iconos)
├─scripts                       # directorio que contiene scripts
├─src
|  ├── application              # directorio con logica de negocio de la aplicación
|  |    ├── parametro
|  |    |   ├── constant                # directorio con constantes
|  |    |   ├── controller              # directorio con controladores
|  |    |   ├── dto                     # directorio con DTO's
|  |    |   ├── entity                  # directorio con entidades
|  |    |   ├── repository              # directorio con repositorios
|  |    |   ├── service                 # directorio con servicios
|  |    |   └── parametro.module.ts     # Fichero para cargar el módulo paramétricas
|  |    ├── ...
|  |    └── moduloN
|  |    └── application.module.ts       # Fichero para cargar los módulos de la aplicación
|  ├── common                           # directorio con modulos comunes (utilitarios, contantes, etc)
|  |    ├── base
|  |    ├── constants
|  |    ├── dto
|  |    ├── entity
|  |    ├── exceptions
|  |    ├── filters
|  |    ├── interceptors
|  |    ├── lib
|  |    ├── middlewares
|  |    ├── params
|  |    ├── templates
|  |    └── validation
|  ├── core                     # directorio con modulos del nucleo del proyecto base
|  |    ├── authentication      # Modulo de autenticacion
|  |    ├── authorization       # Modulo de autorizacion
|  |    ├── config              # Modulo de configuraciones base
|  |    |    ├── authorization
|  |    |    └── database
|  |    ├── external-services   # Modulo de servicios externos
|  |    |    ├── iop
|  |    |    └── mensajeria
|  |    ├── logger              # Módulo para registrar logs en ficheros
|  |    ├── usuario             # Modulo de usuarios
|  |    └── core.module.ts      # Fichero para cargar los módulos core
|  ├── types                    # Fichero que contiene tipos globales de la aplicación
|  ├── app.controller.ts
|  ├── app.module.ts        # Modulo principal de composicion de otros modulos
|  └── main.ts              # Archivo principal de aplicacion
├──test                     # Directorio con test de integracion
├──.env-example             # Archivo con variables de entorno
├──.eslintrc.js             # Archivo config para detectar y corregir errores en tiempo de desarrollo
├──.gitignore
├──.prettierrc              # Archivo config para que el código se vea consistente y bien formateado
├──INSTALL.md                  # Archivo con instrucciones de instalación
├──LICENSE
├──nest-cli.json
├──package-lock.json
├──package.json             # Archivo para ejecutar scripts y declarar las dependencias del proyecto
├──README.md                # Archivo con informacion del proyecto
├──tsconfig.build.json
├──tsconfig.json

```

## Diagrama ERD

![Diagrama ERD](ERD.png 'Diagrama')

## Estructura Modular

El proyecto base contiene una estructura modular, a continuación se puede ver la composición de los más importantes:

### Módulo Nucleo

![Modulo Nucleo](imagenes/modulo-nucleo.png 'Diagrama')

### Módulo Autenticación

![Modulo Autenticacion](imagenes/modulo-autenticacion.png 'Diagrama')

### Módulo Autorización

![Modulo Autorizacion](imagenes/modulo-autorizacion.png 'Diagrama')

### Módulo Usuario

![Modulo Usuario](imagenes/modulo-usuario.png 'Diagrama')

### Módulo Servicios Externos

![Modulo Servicios Externos](imagenes/modulo-external.png 'Diagrama')
