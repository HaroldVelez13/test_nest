import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductsDto } from '../products/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product | undefined> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() product: ProductsDto): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() product: ProductsDto): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.productService.delete(id);
  }
}