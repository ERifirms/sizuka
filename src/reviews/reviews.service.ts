import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from './review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review-dto';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/product.entity';
import { UpdateReviewDto } from './dto/update-review-dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    private productsService: ProductsService,
  ) {}

  find() {
    return this.reviewsRepository.find();
  }

  async createItem(productId: number, review: CreateReviewDto) {
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Item not found');
    }

    const newReview = this.reviewsRepository.create({
      ...review,
      product: product,
    });

    return this.reviewsRepository.save(newReview);
  }

  async update(productId: number, reviewId: number, attrs: UpdateReviewDto) {
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const reviewToUpdate = product.reviews.find(
      (review) => review.id === reviewId,
    );

    if (!reviewToUpdate) {
      throw new NotFoundException('Review not found in this product');
    }

    Object.assign(reviewToUpdate, attrs);
    await this.reviewsRepository.save(reviewToUpdate);

    return reviewToUpdate;
  }

  async remove(productId: number, reviewId: number) {
    try {
      const product = await this.productsService.findOne(productId);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const reviewToRemove = product.reviews.find(
        (review) => review.id === reviewId,
      );
      if (!reviewToRemove) {
        throw new NotFoundException('Review not found in this product');
      }

      // Menghapus review dari basis data
      await this.reviewsRepository.remove(reviewToRemove);

      // Menghapus review dari daftar review di produk

      product.reviews = product.reviews.filter((r) => r.id !== reviewId);

      return await this.productsService.update(product.id, product);
    } catch (error) {
      console.log(error);
    }
  }
}
