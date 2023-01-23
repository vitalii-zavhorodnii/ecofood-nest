import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ValidationPipe } from './pipes/validation.pipe';

import { SwaggerHelper } from 'helpers/swagger.helper';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const swagger = new SwaggerHelper();
  swagger.init(app);

  await app.listen(process.env.PORT);
})();
