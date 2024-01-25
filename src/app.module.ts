import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { Product } from './products/products.entity';
import { Store } from 'src/stores/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsStoresModule } from './products-stores/products-stores.module';

@Module({
  imports:
    [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db/sql',
        synchronize: true,
        entities: [Product, Store],
      }),
      StoresModule,
      ProductsModule,
      ProductsStoresModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
