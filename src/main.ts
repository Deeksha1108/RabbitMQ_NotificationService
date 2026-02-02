import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        noAck: false,
        queueOptions: { durable: true },
        
        // ========== DIRECT EXCHANGE (point-to-point) ==========
        // queue: 'post_queue',
        // Comment out exchange for DIRECT mode

        // ========== FANOUT EXCHANGE (pub-sub) ==========
        queue: 'notification_fanout_queue', // unique queue for notification service
        exchange: 'post_fanout_exchange',
        exchangeType: 'fanout',
      },
    },
  );
  await app.listen();
  console.log('Notification Service is running for RabbitMQ integration...');
}
bootstrap();
