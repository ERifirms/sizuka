import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product-dto';
// import { FindManyOptions } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  find() {
    return this.productRepository.find();
  }

  create(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('product Nor found');
    }
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });

    console.log(product);

    if (!product) {
      throw new NotFoundException('Product not found qwd');
    }
    return product;
  }

  async update(id: number, attrs: Partial<Product>) {
    const product = await this.findOne(id);

    Object.assign(product, attrs);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    return this.productRepository.remove(product);
  }
}
