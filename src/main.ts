import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { VercelRequest, VercelResponse } from '@vercel/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  return app;
}

export const handler = async (req: VercelRequest, res: VercelResponse) => {
  const app = await bootstrap();

  app.getHttpAdapter().getInstance()(req, res);
};
