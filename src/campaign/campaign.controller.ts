import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  @Get(':userId')
  async getCampaigns(@Param('userId') userId: string) {
    return this.campaignService.getCampaignsByUser(userId);
  }

  @Get(':campaignId')
  async getCampaignById(@Param('campaignId') campaignId: string) {
    return this.campaignService.getCampaignById(campaignId);
  }

  @Post(':campaignId/submit')
  async submitContent(
    @Param('campaignId') campaignId: string,
    @Body('userId') userId: string,
    @Body('content') content: string,
  ) {
    return this.campaignService.submitContent(campaignId, userId, content);
  }

  @Post()
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.createCampaign(createCampaignDto);
  }
}
