import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { Product } from './products/products.entity';
import { Store } from 'src/stores/stores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsStoresModule } from './products-stores/products-stores.module';

@Module({
  imports:
    [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [Product, Store],
        synchronize: true,
      }),
      StoresModule,
      ProductsModule,
      ProductsStoresModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
