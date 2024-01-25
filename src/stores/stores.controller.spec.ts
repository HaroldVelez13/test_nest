import { Test, TestingModule } from '@nestjs/testing';
import { StoreDto } from './store.dto';
import { StoreService } from './store.service';
import { StoresController } from './stores.controller';
import { mockStoreService, storeMock1, storeMock2 } from './stores.mocks';

describe('StoreController', () => {
    let controller: StoresController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoresController],
            providers: [
                {
                    provide: StoreService,
                    useValue: mockStoreService,
                },
            ],
        }).compile();

        controller = module.get<StoresController>(StoresController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // Tests para el método findAll()
    it('findAll => should return an array of user', async () => {
        //arrange

        const products = [storeMock1, storeMock2];
        jest.spyOn(mockStoreService, 'findAll').mockReturnValue(products);
        //act
        const result = await controller.findAll();
        // assert
        expect(result).toEqual(products);
        expect(products.length).toBe(2);
        expect(products).toContain(storeMock1);
        expect(products).toContain(storeMock2);
    });

    // Tests para el método findOne()    
    it('findOne => should find a user by a given id and return its data', async () => {
        //arrange
        jest.spyOn(mockStoreService, 'findOne').mockReturnValue(storeMock1);
        //act
        const result = await controller.findOne(storeMock1.id);
        expect(result).toEqual(storeMock1);
        expect(result).toBeDefined();
        expect(result).toEqual(storeMock1);
        expect(result.id).toBe(storeMock1.id);
    });

    it('create => should create a new product by a given data', async () => {
        // arrange
        const storeDto = {
            ...storeMock1
        } as StoreDto;

        jest.spyOn(mockStoreService, 'create').mockReturnValue(storeMock1);
        // act
        const result = await controller.create(storeDto);
        // assert
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(storeDto.name);
        expect(result.city).toBe(storeDto.city);
        expect(result.address).toBe(storeDto.address);
        expect(result).toEqual(storeMock1);
    });


    // Tests para el método update()
    it('update => should find a user by a given id and update its data', async () => {
        //arrange
        const storeDto = {
            ...storeMock1
        } as StoreDto;

        jest.spyOn(mockStoreService, 'update').mockReturnValue(storeMock1);
        //act
        const result = await controller.update(storeMock1.id, storeDto);
        expect(storeMock1).toBeDefined();
        expect(storeMock1.id).toBe(storeMock1.id);
        expect(storeMock1.name).toBe(storeDto.name);
        expect(storeMock1.city).toBe(storeDto.city);
        expect(storeMock1.address).toBe(storeDto.address);
        expect(result).toEqual(storeMock1);
    });

    // Tests para el método Delete()
    it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
        const storeDto = {
            ...storeMock1
        } as StoreDto;

        jest.spyOn(mockStoreService, 'delete').mockReturnValue(storeMock1.id);
        //act
        const result = await controller.delete(storeMock1.id);
        expect(result).toEqual(storeMock1.id);
    });
});