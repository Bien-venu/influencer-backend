import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { SubmissionSchema } from './submission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
    ]),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
