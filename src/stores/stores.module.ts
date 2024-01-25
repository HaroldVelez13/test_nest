import { Module } from '@nestjs/common';
import { Store } from './store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from 'src/stores/store.service';
import { StoresController } from './stores.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    controllers: [StoresController],
    providers: [StoreService],
    exports: [],
})
export class StoresModule { }