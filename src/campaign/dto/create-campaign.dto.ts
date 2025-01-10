export class CreateCampaignDto {
  title: string;
  status: string;
  deadline: string;
  instructions?: string;
  submissions?: { userId: string; content: string }[];
}
