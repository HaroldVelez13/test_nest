import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from './store.entity';
import { StoreDto } from './store.dto';

@Controller('stores')
export class StoresController {
    constructor(private readonly storeService: StoreService) { }

    @Get()
    async findAll(): Promise<Store[]> {
        return this.storeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Store | undefined> {
        return this.storeService.findOne(id);
    }

    @Post()
    async create(@Body() store: StoreDto): Promise<Store> {
        return this.storeService.create(store);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() store: StoreDto): Promise<Store> {
        return this.storeService.update(id, store);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<number> {
        return this.storeService.delete(id);
    }
}