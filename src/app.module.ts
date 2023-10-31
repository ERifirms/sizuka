import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products/products.service';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsModule } from './products/products.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    ReviewsModule,
    ProductsModule,
  ],
  controllers: [AppController, ReviewsController, ProductsController],
  providers: [AppService, ProductsService, ReviewsService],
})
export class AppModule {}
