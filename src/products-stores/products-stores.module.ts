import { Module } from '@nestjs/common';
import { ProductsStoresService } from './products.stores.service';
import { ProductsStoresController } from './products.stores.controller';
import { Product } from '../products/products.entity';
import { Store } from '../stores/stores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Store])],
    controllers: [ProductsStoresController],
    providers: [ProductsStoresService],
    exports: [],
})
export class ProductsStoresModule { }


