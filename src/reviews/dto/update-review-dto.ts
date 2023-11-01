import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsNumber()
  @IsOptional()
  ratting: number;

  @IsString()
  @IsOptional()
  body: string;
}
