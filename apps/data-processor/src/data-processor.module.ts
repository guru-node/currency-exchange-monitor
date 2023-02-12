import { Module } from '@nestjs/common';
import { ServiceModule } from '@app/service';
import { BinanceModule } from '@app/data-processor/binance/binance.module';

@Module({
  imports: [ServiceModule.register(), BinanceModule],
})
export class DataProcessorModule {}
