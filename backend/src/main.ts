import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //local

  // app.enableCors({
  //   origin: 'http://localhost:3000', // Вкажи порт, на якому працює фронтенд
  //   credentials: true,
  // });

  //prod

  app.enableCors({
    origin: 'https://flash-sigma-ten.vercel.app', // Вкажи порт, на якому працює фронтенд
    credentials: true,
  });

  await app.listen(3002);
}
bootstrap();
