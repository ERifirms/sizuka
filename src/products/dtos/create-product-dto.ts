import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  location: string;

  @IsString()
  description: string;
}
