/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Patch,
  Request,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  @Get(':id')
  async getCampaignById(@Param('id') id: string) {
    const campaign = await this.campaignService.getCampaignById(id);

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':campaignId/submit')
  async submitContent(
    @Param('campaignId') campaignId: string,
    @Request() req: any,
    @Body('content') content: string,
    @Body('submissionDate') submissionDate?: string,
  ) {
    const userId = req.user.userId;

    const dateToSubmit = submissionDate ? new Date(submissionDate) : new Date();

    return this.campaignService.submitContent(
      campaignId,
      userId,
      content,
      dateToSubmit,
    );
  }

  @Patch(':campaignId/submissions/:submissionId/status')
  async updateSubmissionStatus(
    @Param('campaignId') campaignId: string,
    @Param('submissionId') submissionId: string,
    @Body('status') status: 'approved' | 'rejected',
    @Request() req: any, // Access the user from the request
  ) {
    // Call service to update the status
    return this.campaignService.updateSubmissionStatus(
      campaignId,
      submissionId,
      status,
    );
  }

  // Authorization check (for example purposes)
  private isUserAuthorized(user: any, campaignId: string): boolean {
    // Implement your authorization logic, e.g., checking if the user is the campaign owner or admin
    return user.role === 'admin'; // Example of a basic role check
  }

  @Post()
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.createCampaign(createCampaignDto);
  }
}
