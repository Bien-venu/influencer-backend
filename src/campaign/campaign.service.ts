import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  campaigns: any;
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
  ) {}

  async getAllCampaigns() {
    return this.campaignModel.find().exec();
  }

  async getCampaignsByUser(userId: string) {
    return this.campaignModel.find({ 'submissions.userId': userId });
  }

  async getCampaignById(campaignId: string): Promise<Campaign> {
    return this.campaignModel.findById(campaignId).exec();
  }

  async submitContent(campaignId: string, userId: string, content: string) {
    return this.campaignModel.findByIdAndUpdate(
      campaignId,
      { $push: { submissions: { userId, content } } },
      { new: true },
    );
  }

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    const createdCampaign = new this.campaignModel(createCampaignDto);
    return createdCampaign.save();
  }
}
