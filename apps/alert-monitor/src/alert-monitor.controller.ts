import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AlertMonitorService } from './alert-monitor.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
} from '@nestjs/microservices';
import { decorator } from '@app/service/decorators';

@Controller()
export class AlertMonitorController implements OnModuleInit {
  constructor(
    @Inject('ALERT_MONITOR_SERVICE')
    private consumer: ClientKafka,
    private readonly service: AlertMonitorService,
  ) {}

  async onModuleInit() {
    this.consumer.subscribeToResponseOf(
      'alert-monitor.subscribeAllBookTickers',
    );
    await this.consumer.connect();
  }

  @MessagePattern('alert-monitor.subscribeAllBookTickers')
  async subscribeAllBookTickers(
    @decorator.transform.RPCPayload({
      s: 'symbol',
      b: 'bidPrice',
      B: 'bidQty',
      a: 'askPrice',
      A: 'askQty',
    })
    message: any,
    @Ctx() context: KafkaContext,
  ) {
    await this.service.saveBookTickers(message);
    await context.getConsumer().commitOffsets([
      {
        partition: context.getPartition(),
        topic: context.getTopic(),
        offset: context.getMessage().offset,
      },
    ]);
  }
}
