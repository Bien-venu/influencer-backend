import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';

import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/submission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Get()
  async getAllSubmissions() {
    return this.submissionService.getAllSubmissions();
  }

  @Get('submission/:campaignId')
  async getSubmissionsByCampaign(@Param('campaignId') campaignId: string) {
    return this.submissionService.getSubmissionsByCampaign(campaignId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSubmission(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.submissionService.createSubmission({
      ...createSubmissionDto,
      userId,
    });
  }

  @Patch(':id/status')
  async updateSubmissionStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.submissionService.updateSubmissionStatus(id, status);
  }
}
