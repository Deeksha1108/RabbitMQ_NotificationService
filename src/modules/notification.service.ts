import { Injectable } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Injectable()
export class NotificationService {

  @EventPattern('post.created')
  handlePostCreated(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('Notification received:', data);

    const channel = context.getChannelRef();
    const msg = context.getMessage();

    channel.ack(msg);
  }
}
