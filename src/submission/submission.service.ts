import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from './submission.schema';
import { CreateSubmissionDto } from './dto/submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<Submission>,
  ) {}

  async getAllSubmissions() {
    return this.submissionModel.find().populate('campaignId').exec();
  }

  async getSubmissionsByCampaign(campaignId: string) {
    return this.submissionModel.find({ campaignId }).exec();
  }

  async getSubmissionsByUser(userId: string) {
    return this.submissionModel.find({ userId }).exec();
  }

  async createSubmission(createSubmissionDto: CreateSubmissionDto) {
    const submission = new this.submissionModel(createSubmissionDto);
    return submission.save();
  }

  async updateSubmissionStatus(id: string, status: string) {
    const submission = await this.submissionModel.findById(id);
    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }
    submission.status = status;
    return submission.save();
  }
}
