import { Expose, Transform } from 'class-transformer';

export class ReviewDto {
  @Expose()
  id: number;

  @Expose()
  ratting: number;

  @Expose()
  body: string;
}
