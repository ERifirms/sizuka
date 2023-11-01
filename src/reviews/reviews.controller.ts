import { Controller, Put } from '@nestjs/common';
import { Get, Body, Post, Param, Patch, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review-dto';
import { UpdateReviewDto } from './dto/update-review-dto';
import { Serialize } from 'src/interseptors/serialize-interseptor';
import { ReviewDto } from './dto/review-dto';

@Controller('product')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('/reviews')
  @Serialize(ReviewDto)
  findAll() {
    return this.reviewsService.find();
  }

  @Post('/:id/reviews')
  async create(
    @Param('id') productId: string,
    @Body() review: CreateReviewDto,
  ) {
    return await this.reviewsService.createItem(parseInt(productId), review);
  }

  @Patch('/:productId/reviews/:reviewId')
  update(
    @Param('productId') productId: string,
    @Param('reviewId') reviewId: string,
    @Body() review: UpdateReviewDto,
  ) {
    return this.reviewsService.update(
      parseInt(productId),
      parseInt(reviewId),
      review,
    );
  }

  @Delete('/:productId/reviews/:reviewId')
  remove(
    @Param('productId') productId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewsService.remove(parseInt(productId), parseInt(reviewId));
  }
}
