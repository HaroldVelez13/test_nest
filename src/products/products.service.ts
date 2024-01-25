import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from 'src/products/products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,) { }


    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            return product
        }
        throw new NotFoundException(`No se encuentra el producto ${id}`);
    }

    async create(productDto: ProductDto): Promise<Product> {
        const product = this.productRepository.create(productDto);
        await this.productRepository.save(product);
        return product;
    }

    async update(id: number, productDto: ProductDto): Promise<Product> {
        const preload_product = {
            id,
            ...productDto,
        }
        const product = await this.productRepository.preload(preload_product);
        if (product) {
            return await this.productRepository.save(product);
        }
        throw new NotFoundException(`No se encuentra el producto ${id}`);
    }

    async delete(id: number): Promise<number> {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            await this.productRepository.remove(product);
            return id

        }
        throw new NotFoundException(`No se encuentra el producto ${id}`);
    }
}