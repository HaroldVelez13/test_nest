import { Module } from '@nestjs/common';
import { Store } from './stores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresService } from 'src/stores/stores.service';
import { StoresController } from './stores.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    controllers: [StoresController],
    providers: [StoresService],
    exports: [],
})
export class StoresModule { }