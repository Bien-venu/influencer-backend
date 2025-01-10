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

  @Prop({
    type: [
      {
        userId: { type: String, required: true },
        content: { type: String, required: true },
        submissionDate: { type: Date, required: true },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
      },
    ],
  })
  submissions: {
    userId: string;
    content: string;
    submissionDate: Date;
    status: string;
  }[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
