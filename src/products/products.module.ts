import { Module } from '@nestjs/common';
import { Product } from './products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductController } from './products.controller';
import { ProductsStoresController } from '../products-stores/products.stores.controller';
import { ProductsStoresService } from '../products-stores/products.store.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductsService],
    exports: [],
})
export class ProductsModule { }