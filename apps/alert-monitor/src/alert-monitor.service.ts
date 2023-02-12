import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { clone } from 'lodash';
import {
  Exchange,
  ExchangeDocument,
} from '@app/alert-monitor/schema/exchange.schema';
import { ConfigService } from '@app/service/config/config.service';
import { ClientKafka } from '@nestjs/microservices';
import { Util } from '@app/service/utils/util';

@Injectable()
export class AlertMonitorService {
  private readonly logger = new Logger(AlertMonitorService.name);
  private readonly threshold: {
    [key: string]: {
      ask: {
        type: string;
        up: string;
        down: string;
        to: string;
        reachedto: string;
        wentdownto: string;
      };
      bid: {
        type: string;
        up: string;
        down: string;
        to: string;
        reachedto: string;
        wentdownto: string;
      };
    };
  };
  constructor(
    @InjectModel(Exchange.name)
    private readonly exchangeModel: Model<ExchangeDocument>,
    @Inject('ALERT_HANDLER_SERVICE')
    private alertHandlerService: ClientKafka,
    private configService: ConfigService,
  ) {
    this.threshold = this.configService.get('binance.tickers.threshold');
  }

  async saveBookTickers(data) {
    if (!data) {
      return;
    }

    const symbol = await this.exchangeModel.findOne({ symbol: data.symbol });
    if (symbol) {
      await this.makePriceChange(data, symbol);
    }

    // console.log(`Message: ${json5.stringify(data, null, 2)}`);
    await this.exchangeModel.updateOne({ symbol: data.symbol }, data, {
      upsert: true,
    });
  }

  async makePriceChange(data, symbol) {
    data.askPriceChange = (
      Number(symbol.askPriceChange || 0) +
      Number(Number(data.askPrice) - Number(symbol.askPrice))
    ).toFixed(8);

    data.bidPriceChange = (
      Number(symbol.bidPriceChange || 0) +
      (Number(data.bidPrice || 0) - Number(symbol.bidPrice))
    ).toFixed(8);

    const threshold = this.threshold[symbol.symbol];

    const alert = clone(data);
    const calc = this.calculateChanges(threshold, data);
    if (calc.askUp || calc.askDown) {
      alert.type = (calc.askUp && 'ask-up') || (calc.askDown && 'ask-down');
      data.askPriceChange = '0';
      await Util.toPromise(
        this.alertHandlerService.emit('alert-handler.alertBookTickers', alert),
      );
    }

    if (calc.bidUp || calc.bidDown) {
      alert.type = (calc.bidUp && 'bid-up') || (calc.bidDown && 'bid-down');
      data.bidPriceChange = '0';
      await Util.toPromise(
        this.alertHandlerService.emit('alert-handler.alertBookTickers', alert),
      );
    }

    if (calc.askReachedto) {
      alert.type = 'ask-reachedto';
      await Util.toPromise(
        this.alertHandlerService.emit('alert-handler.alertBookTickers', alert),
      );
      threshold.ask.reachedto = null;
    }
    if (calc.askWentdownto) {
      alert.type = 'ask-wentdownto';
      await Util.toPromise(
        this.alertHandlerService.emit('alert-handler.alertBookTickers', alert),
      );
      threshold.ask.wentdownto = null;
    }

    if (calc.bidReachedto) {
      alert.type = 'bid-reachedto';
      await Util.toPromise(
        this.alertHandlerService.emit('alert-handler.alertBookTickers', alert),
      );
      threshold.bid.reachedto = null;
    }
    if (calc.bidWentdownto) {
      alert.type = 'bid-wentdownto';
      await Util.toPromise(
        this.alertHandlerService.emit('alert-handler.alertBookTickers', alert),
      );
      threshold.bid.wentdownto = null;
    }

    if (alert.type) {
      this.logger.log(
        `ALERT: ${alert.type}: ${alert.symbol} ${alert.bidPriceChange} ${alert.askPriceChange}`,
      );
    }
  }

  private calculateChanges(threshold, data) {
    const askUp =
      threshold.ask.up &&
      Number(data.askPriceChange) >= Number(threshold.ask.up);
    const askDown =
      threshold.ask.down &&
      Number(data.askPriceChange) <= Number(threshold.ask.down);
    const askReachedto =
      threshold.ask.reachedto &&
      Number(data.askPrice) >= Number(threshold.ask.reachedto);
    const askWentdownto =
      threshold.ask.wentdownto &&
      Number(data.askPrice) <= Number(threshold.ask.wentdownto);

    const bidUp =
      threshold.bid.up &&
      Number(data.bidPriceChange) >= Number(threshold.bid.up);
    const bidDown =
      threshold.bid.down &&
      Number(data.bidPriceChange) <= Number(threshold.bid.down);
    const bidReachedto =
      threshold.bid.reachedto &&
      Number(data.bidPrice) >= Number(threshold.bid.reachedto);
    const bidWentdownto =
      threshold.bid.wentdownto &&
      Number(data.bidPrice) <= Number(threshold.bid.wentdownto);

    return {
      askUp,
      askDown,
      askReachedto,
      askWentdownto,
      bidUp,
      bidDown,
      bidReachedto,
      bidWentdownto,
    };
  }
}
