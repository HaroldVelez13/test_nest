import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../products/products.entity';
import { Store } from '../stores/stores.entity';
import { In, Repository } from 'typeorm';
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
      throw new NotFoundException(`No se encontró el producto ${productId}`);
    }

    if (!store) {
      throw new NotFoundException(`No se encontró la tienda ${storeId}`);
    }

    product.stores.push(store);
    const updated_product = this.productRepository.save(product);
    return updated_product;
  }

  async findStoresFromProduct(productId: number): Promise<Store[]> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        stores: true,
      }
    });

    if (!product) {
      throw new NotFoundException('No se encontró el producto');
    }
    return product.stores
  }

  async findStoreFromProduct(productId: number, storeId: number): Promise<Store> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException(`No se encontró el producto ${productId}}`);
    }
    const find = product?.stores?.find((store) => store.id === storeId) ?? false;
    if (!find) {
      throw new NotFoundException(`El Producto ${productId} no tiene asociada la Tienda ${storeId}`);
    }

    return product.stores.find((store) => store.id === storeId);
  }

  async updateStoresFromProduct(productId: number, storesId: number[]): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: productId });
    const stores = await this.storeRepository.find({
      where: { id: In(storesId) }
    })
    if (stores.length !== storesId.length) {
      throw new NotFoundException('Una o mas tiendas no existen');
    }
    if (!product) {
      throw new NotFoundException(`No se encontró el producto ${productId}`);
    }

    product.stores = stores;
    const updated_product = await this.productRepository.save(product);
    return updated_product;
  }

  async deleteStoreFromProduct(productId: number, storeId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        stores: true,
      }
    })

    if (!product) {
      throw new NotFoundException(`No se encontró el producto ${productId}`);
    }
    const storeIndex = product.stores.findIndex((store) => store.id == storeId);

    if (storeIndex === -1) {
      throw new NotFoundException(`La tienda ${storeId} no está asociada al producto ${productId} o no existe`);
    }
    const store = await this.storeRepository.findOneBy({ id: storeId });
    await this.storeRepository.remove(store);
    product.stores.splice(storeIndex, 1);
    const updated_product = await this.productRepository.save(product);
    return updated_product
  }
}