import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  ratting: number;

  @IsString()
  body: string;
}
