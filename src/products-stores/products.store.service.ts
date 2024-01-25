import { Injectable } from '@nestjs/common';
import { Product } from '../products/products.entity';
import { Store } from '../stores/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsStoresService {

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async addStoreToProduct(productId: number, storeId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        stores: true,
      }
    });
    const store = await this.storeRepository.findOneBy({ id: storeId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    if (!store) {
      throw new Error('No se encontró la tienda');
    }

    product.stores.push(store);
    const updated_product = this.productRepository.save(product);
    return updated_product;
  }

  async findStoresFromProduct(productId: number): Promise<Store[]> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }
    return product.stores
  }

  async findStoreFromProduct(productId: number, storeId: number): Promise<Store> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    return product.stores.find((store) => store.id === storeId);
  }

  async updateStoresFromProduct(productId: number, stores: Store[]): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    product.stores = stores;
    const updated_product = await this.productRepository.save(product);
    return updated_product;
  }

  async deleteStoreFromProduct(productId: number, storeId: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    const storeIndex = product.stores.findIndex((store) => store.id === storeId);

    if (storeIndex === -1) {
      throw new Error('La tienda no está asociada al producto');
    }

    product.stores.splice(storeIndex, 1);
    const updated_product = await this.productRepository.save(product);
    return updated_product
  }
}