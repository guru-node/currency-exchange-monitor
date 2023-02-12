import { Document, SchemaTypes } from 'mongoose';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExchangeEntity } from '@app/alert-monitor/entities/exchange.entity';

export type ExchangeDocument = Exchange & Document;

@Schema()
export class Exchange extends ExchangeEntity {
  @Prop({ type: SchemaTypes.String })
  declare symbol?: string;

  @Prop({ type: SchemaTypes.String })
  declare bidPrice?: string;

  @Prop({ type: SchemaTypes.String })
  declare bidPriceChange?: string;

  @Prop({ type: SchemaTypes.String })
  declare bidPriceUp?: string;

  @Prop({ type: SchemaTypes.String })
  declare bidPriceDown?: string;

  @Prop({ type: SchemaTypes.String })
  declare bidQty?: string;

  @Prop({ type: SchemaTypes.String })
  declare askPrice?: string;

  @Prop({ type: SchemaTypes.String })
  declare askPriceChange?: string;

  @Prop({ type: SchemaTypes.String })
  declare askPriceUp?: string;

  @Prop({ type: SchemaTypes.String })
  declare askPriceDown?: string;

  @Prop({ type: SchemaTypes.String })
  declare askQty?: string;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);

export const ExchangeModel = MongooseModule.forFeature([
  { name: Exchange.name, schema: ExchangeSchema },
]);
