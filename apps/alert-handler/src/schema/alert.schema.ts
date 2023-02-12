import { Document, SchemaTypes } from 'mongoose';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AlertEntity } from '@app/alert-handler/entities/alert.entity';

export type AlertDocument = Alert & Document;

@Schema()
export class Alert extends AlertEntity {
  @Prop({ type: SchemaTypes.String })
  declare symbol?: string;

  @Prop({ type: SchemaTypes.String })
  declare bidPrice?: string;

  @Prop({ type: SchemaTypes.String })
  declare bidPriceChange?: string;

  @Prop({ type: SchemaTypes.String })
  declare askPrice?: string;

  @Prop({ type: SchemaTypes.String })
  declare askPriceChange?: string;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);

export const AlertModel = MongooseModule.forFeature([
  { name: Alert.name, schema: AlertSchema },
]);
