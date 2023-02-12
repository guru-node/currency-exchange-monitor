import { Injectable, Logger } from '@nestjs/common';
import * as fetch from 'node-fetch';
import { json5 } from '@app/service/parser/json5';
import { ConfigService } from '@app/service/config/config.service';
import { json } from '@app/service/parser/json';

@Injectable()
export class AlertHandlerService {
  private readonly logger = new Logger(AlertHandlerService.name);
  constructor(private configService: ConfigService) {}
  async sendAlertBookTickers(data) {
    this.logger.log(`ALERT: ${json5.stringify(data, null, 2)}`);
    await fetch(this.configService.get('webhook.url'), {
      method: 'POST',
      body: json.stringify(data),
    });
  }
}
