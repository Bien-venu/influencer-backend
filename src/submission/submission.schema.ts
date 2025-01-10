import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Submission extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  campaignId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  submissionDate: Date;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
