import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { ProductsStoresService } from './products.stores.service';
import { Store } from '../stores/stores.entity';
import { Product } from '../products/products.entity';

@Controller('products/:productId/stores')
export class ProductsStoresController {
  constructor(private readonly storeProductService: ProductsStoresService) { }

  @Get()
  async findStoresFromProduct(
    @Param('productId') productId: number,
  ): Promise<Store[]> {
    return this.storeProductService.findStoresFromProduct(productId);
  }

  @Get(':storeId')
  async findStoreFromProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ): Promise<Store> {
    return this.storeProductService.findStoreFromProduct(productId, storeId);
  }

  @Post()
  async addStoreToProduct(
    @Param('productId') productId: number,
    @Body() body: { storeId: number },
  ): Promise<Product> {
    return this.storeProductService.addStoreToProduct(productId, body.storeId);
  }

  @Post()
  async updateStoresFromProduct(
    @Param('productId') productId: number,
    @Body() body: { stores: Store[] },
  ): Promise<Product> {
    return this.storeProductService.updateStoresFromProduct(productId, body.stores);
  }

  @Post('delete-store')
  async deleteStoreFromProduct(
    @Param('productId') productId: number,
    @Param('storeId') storeId: number,
  ): Promise<Product> {
    return this.storeProductService.deleteStoreFromProduct(productId, storeId);
  }
}