import { Module } from '@nestjs/common';
import { ProductsStoresService } from './products.store.service';
import { ProductsStoresController } from './products.stores.controller';
import { Product } from '../products/products.entity';
import { Store } from '../stores/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [],
    controllers: [ProductsStoresController],
    providers: [ProductsStoresService],
    exports: [],
})
export class ProductsStoresModule { }


