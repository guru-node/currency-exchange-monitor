import { Inject, Injectable, Logger } from '@nestjs/common';
import { MainClient, WebsocketClient } from 'binance';
import { ConfigService } from '@app/service/config/config.service';
import { ClientKafka } from '@nestjs/microservices';
import { Util } from '@app/service/utils/util';
import WebSocket from 'isomorphic-ws';
import { WsKey } from 'binance/lib/websocket-client';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private readonly mainClient: MainClient;
  private readonly wsClient: WebsocketClient;

  constructor(
    @Inject('ALERT_MONITOR_SERVICE')
    private alertMonitorService: ClientKafka,
    private configService: ConfigService,
  ) {
    const secrets = this.configService.get<{
      apiKey: string;
      apiSecret: string;
    }>('binance.secrets');
    this.mainClient = new MainClient({
      api_key: secrets.apiKey,
      api_secret: secrets.apiSecret,
    });
    this.wsClient = new WebsocketClient({
      api_key: secrets.apiKey,
      api_secret: secrets.apiSecret,
    });
  }

  async wsSync() {
    queueMicrotask(() => this.subscribeAllBookTickers());
  }

  async subscribeAllBookTickers() {
    // receive raw events
    this.wsClient.on('message', async (data: any) => {
      await Util.toPromise(
        this.alertMonitorService.emit(
          'alert-monitor.subscribeAllBookTickers',
          data,
        ),
      );
    });

    this.wsClient.on(
      'open',
      (event: { wsKey: WsKey; ws: WebSocket; event?: any }) => {
        this.logger.log(`connection opened open: ${event?.wsKey}`);
      },
    );

    this.wsClient.on(
      'reconnecting',
      (event: { wsKey: WsKey; ws: WebSocket; event?: any }) => {
        this.logger.log(`ws automatically reconnecting.... ${event?.wsKey}`);
      },
    );

    this.wsClient.on(
      'reconnected',
      (event: { wsKey: WsKey; ws: WebSocket; event?: any }) => {
        this.logger.log(`ws has reconnected ${event?.wsKey}`);
      },
    );

    this.wsClient.on(
      'error',
      (event: { wsKey: WsKey; error: any; rawEvent?: string }) => {
        this.logger.error(`ws saw error ${event?.wsKey}`);
      },
    );

    this.wsClient.on(
      'close',
      (event: { wsKey: WsKey; ws: WebSocket; event?: any }) => {
        this.logger.log(`ws saw error ${event?.wsKey}`);
      },
    );

    type market = 'spot' | 'usdm' | 'coinm';
    const tickers = this.configService.get<{
      market: market;
      symbols: string[];
    }>('binance.tickers');

    for await (const symbol of tickers.symbols) {
      await this.wsClient.subscribeSymbol24hrTicker(
        symbol,
        tickers.market,
        false,
      );
    }
  }
}
