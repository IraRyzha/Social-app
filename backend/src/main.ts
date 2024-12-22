import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://flash-sigma-ten.vercel.app'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`Running on port ${port}`));
}
bootstrap();
