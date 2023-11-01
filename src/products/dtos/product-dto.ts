import { Expose, Transform, Type } from 'class-transformer';
import { ReviewDto } from 'src/reviews/dto/review-dto';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  location: string;

  @Expose()
  category: string;

  @Expose({ name: 'reviews' })
  @Type(() => ReviewDto)
  reviews: ReviewDto[];
}
