import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

import { DtoValidationPipe } from 'pipes/dto-validation.pipe';

import { SwaggerHelper } from 'helpers/swagger.helper';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new DtoValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swagger = new SwaggerHelper();
  swagger.init(app);

  await app.listen(process.env.PORT);
})();
