import { Injectable } from '@nestjs/common';
import { Product } from '../products/products.entity';
import { Store } from '../stores/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreService } from '../stores/store.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ProductsStoresService {

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async addStoreToProduct(productId: number, storeId: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: productId });
    const store = await this.storeRepository.findOneBy({ id: storeId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    if (!store) {
      throw new Error('No se encontró la tienda');
    }

    product.stores.push(store);
    this.productRepository.save(product);
  }

  async findStoresFromProduct(productId: number): Promise<Store[]> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }
    return product.stores
  }

  async findStoreFromProduct(productId: number, storeId: number): Promise<Store> | undefined {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    return product.stores.find((store) => store.id === storeId);
  }

  async updateStoresFromProduct(productId: number, stores: Store[]): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    product.stores = stores;
    this.productRepository.save(product);
  }

  async deleteStoreFromProduct(productId: number, storeId: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    const storeIndex = product.stores.findIndex((store) => store.id === storeId);

    if (storeIndex === -1) {
      throw new Error('La tienda no está asociada al producto');
    }

    product.stores.splice(storeIndex, 1);
    this.productRepository.save(product);
  }
}