import { Module } from '@nestjs/common';
import { Product } from './products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [],
})
export class ProductsModule { }