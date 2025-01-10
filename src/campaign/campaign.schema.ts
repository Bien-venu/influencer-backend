import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Campaign extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop()
  instructions: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
