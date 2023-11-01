import { Controller } from '@nestjs/common';
import { Get, Body, Post, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { UpdateProductDto } from './dtos/update-product-dto';
import { Serialize } from 'src/interseptors/serialize-interseptor';
import { ProductDto } from './dtos/product-dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Serialize(ProductDto)
  getAll() {
    return this.productsService.find();
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Get('/:id')
  @Serialize(ProductDto)
  async findOneBy(@Param('id') id: string) {
    return await this.productsService.findOne(parseInt(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return await this.productsService.update(parseInt(id), product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(parseInt(id));
  }
}
