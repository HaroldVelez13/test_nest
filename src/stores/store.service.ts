import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from './store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreDto } from 'src/stores/store.dto';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>) { }


    async findAll(): Promise<Store[]> {
        return await this.storeRepository.find();
    }

    async findOne(id: number): Promise<Store> {
        const store = await this.storeRepository.findOneBy({ id });
        if (store) {
            return store
        }
        throw new NotFoundException(`No se encuentra la tienda ${id}`);
    }

    async create(storeDto: StoreDto): Promise<Store> {
        const store = this.storeRepository.create(storeDto);
        await this.storeRepository.save(store);
        return store;
    }

    async update(id: number, storeDto: StoreDto): Promise<Store> {
        const preload_store = {
            id,
            ...storeDto,
        }
        const store = await this.storeRepository.preload(preload_store);
        if (store) {
            return await this.storeRepository.save(store);
        }
        throw new NotFoundException(`No se encuentra la tienda ${id}`);
    }

    async delete(id: number): Promise<void> {
        const store = await this.storeRepository.findOneBy({ id });
        if (store) {
            this.storeRepository.remove(store);
        }
        throw new NotFoundException(`No se encuentra la tienda ${id}`);
    }
}