import * as sw from '@nestjs/swagger';
import { decorator } from '@app/service/decorators';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    symbol: {
      type: 'string',
    },
  },
})
export class AssetInput {
  @sw.ApiProperty({ required: false })
  symbol?: string;
}
