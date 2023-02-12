import { Module } from '@nestjs/common';
import { ServiceModule } from '@app/service';
import { AlertMonitorController } from '@app/alert-monitor/alert-monitor.controller';
import { AlertMonitorService } from '@app/alert-monitor/alert-monitor.service';
import { ExchangeModel } from '@app/alert-monitor/schema/exchange.schema';

@Module({
  imports: [ServiceModule.register(), ExchangeModel],
  controllers: [AlertMonitorController],
  providers: [AlertMonitorService],
})
export class AlertMonitorModule {}
