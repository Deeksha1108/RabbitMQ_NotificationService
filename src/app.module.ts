import { Module } from '@nestjs/common';
import { NotificationService } from './modules/notification.service';

@Module({
  providers: [NotificationService],
  controllers: [NotificationService],
})
export class AppModule {}
