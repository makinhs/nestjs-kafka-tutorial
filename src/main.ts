import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:29092'],
      },
    },
  });
  await app.listen(3000);
  await app.startAllMicroservices();
}

bootstrap();
