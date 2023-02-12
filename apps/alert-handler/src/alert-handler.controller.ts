import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { AlertHandlerService } from './alert-handler.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AlertHandlerController implements OnModuleInit {
  constructor(
    @Inject('ALERT_HANDLER_SERVICE')
    private consumer: ClientKafka,
    private readonly service: AlertHandlerService,
  ) {}

  async onModuleInit() {
    this.consumer.subscribeToResponseOf('alert-handler.alertBookTickers');
    await this.consumer.connect();
  }

  @MessagePattern('alert-handler.alertBookTickers')
  async alertBookTickers(
    @Payload()
    message: any,
    @Ctx() context: KafkaContext,
  ) {
    await this.service.sendAlertBookTickers(message);
    await context.getConsumer().commitOffsets([
      {
        partition: context.getPartition(),
        topic: context.getTopic(),
        offset: context.getMessage().offset,
      },
    ]);
  }
}
