import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { Session } from '@/core/authentication/entity/session.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeormStore } from 'connect-typeorm';
import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';

import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

import { AppModule } from './app.module';
import { LoggerModule, printInfo, printLogo, printRoutes } from './core/logger';
import packageJson from '../package.json';

import {
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_NAME,
  SWAGGER_API_ROOT,
} from './common/constants';

configDotenv();

export const SessionAppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  synchronize: false,
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  await LoggerModule.initialize(app);

  const configService = app.get(ConfigService);

  // swagger
  if (configService.get('NODE_ENV') !== 'production') {
    createSwagger(app);
  }

  await SessionAppDataSource.initialize();

  // configuration app
  const repositorySession = SessionAppDataSource.getRepository(Session);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET') || '',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      name: 'base.connect.sid',
      cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      },
      store: new TypeormStore({ ttl: 3600, cleanupLimit: 2 }).connect(
        repositorySession,
      ),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.use(express.static('public'));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(helmet.hidePoweredBy());
  app.use(helmet());
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  printRoutes(app);
  printLogo();
  printInfo({
    env: String(process.env.NODE_ENV),
    name: packageJson.name,
    port: port,
    version: packageJson.version,
  });
}

function createSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addServer(`http://localhost:${process.env.PORT}/api/`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app as any, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app as any, document);
}

void bootstrap();
