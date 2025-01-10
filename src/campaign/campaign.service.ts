import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getCampaignById(id: string): Promise<Campaign | null> {
    const campaign = await this.campaignModel.findById(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async submitContent(
    campaignId: string,
    userId: string,
    content: string,
    submissionDate: Date,
  ) {
    return this.campaignModel.findByIdAndUpdate(
      campaignId,
      {
        $push: {
          submissions: {
            userId,
            content,
            submissionDate,
            status: 'pending',
          },
        },
      },
      { new: true },
    );
  }
  async updateSubmissionStatus(
    campaignId: string,
    submissionId: string,
    status: string,
  ) {
    console.log(campaignId, submissionId, status);
    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    const submission = campaign.submissions.find(
      (sub) => sub.userId === submissionId,
    );

    if (!submission) {
      throw new NotFoundException(
        `Submission with ID ${submissionId} not found`,
      );
    }

    submission.status = status;

    await campaign.save();

    return campaign;
  }

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    const createdCampaign = new this.campaignModel(createCampaignDto);
    return createdCampaign.save();
  }
}
