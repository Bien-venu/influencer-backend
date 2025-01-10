import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
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
    @Body('content') content: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.campaignService.submitContent(campaignId, userId, content);
  }

  @Post()
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.createCampaign(createCampaignDto);
  }
}
