import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignModule } from './campaign/campaign.module';
import { AuthModule } from './auth/auth.module';
import { SubmissionModule } from './submission/submission.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    CampaignModule,
    AuthModule,
    SubmissionModule,
  ],
})
export class AppModule {}
