import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsString()
  campaignId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsDate()
  submissionDate: Date;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
