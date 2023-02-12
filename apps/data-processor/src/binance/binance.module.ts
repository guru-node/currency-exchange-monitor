import { Module, OnModuleInit } from '@nestjs/common';
import { BinanceService } from '@app/data-processor/binance/binance.service';

@Module({
  providers: [BinanceService],
})
export class BinanceModule implements OnModuleInit {
  constructor(private readonly binanceService: BinanceService) {}

  async onModuleInit() {
    try {
      await this.binanceService.wsSync();
    } catch (e) {
      console.log(e);
    }
  }
}
