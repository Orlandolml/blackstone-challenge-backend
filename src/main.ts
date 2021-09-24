import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8080',
  });
  app.listen(5000).then(() => console.log('Server is listening on port 5000'));
}
bootstrap();
