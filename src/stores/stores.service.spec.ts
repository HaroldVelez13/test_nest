import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StoreDto } from './stores.dto';
import { Store } from './stores.entity';
import { StoresService } from './stores.service';
import { storeMock1, storeMock2, mockStoreRepository } from './stores.mocks';


describe('storeService', () => {
    let storeService: StoresService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StoresService,
                {
                    provide: getRepositoryToken(Store),
                    useValue: mockStoreRepository,
                },
            ],
        }).compile();

        storeService = module.get<StoresService>(StoresService);
    });

    it('should be defined', () => {
        expect(storeService).toBeDefined();
    });

    // Tests para el método findAll()
    it('should return all stores', async () => {
        const stores = [storeMock1, storeMock2];
        jest.spyOn(mockStoreRepository, 'find').mockReturnValue(stores);
        //act
        const result = await storeService.findAll();
        // assert
        expect(result).toEqual(stores);
        expect(stores.length).toBe(2);
        expect(stores).toContain(storeMock1);
        expect(stores).toContain(storeMock2);
    });

    // Tests para el método findOne()
    it('findOne => should find a product by a given id and return its data', async () => {
        //arrange   
        jest.spyOn(mockStoreRepository, 'findOneBy').mockReturnValue(storeMock1);
        //act
        const result = await storeService.findOne(storeMock1.id);
        expect(result).toBeDefined();
        expect(result).toEqual(storeMock1);
        expect(result.id).toBe(storeMock1.id);
    });

    // Tests para el método create()
    it('create => Should create a new user and return its data', async () => {
        // arrange
        const storeDto = {
            ...storeMock1
        } as StoreDto;


        jest.spyOn(mockStoreRepository, 'save').mockReturnValue(storeMock1);
        jest.spyOn(mockStoreRepository, 'create').mockReturnValue(storeMock1);
        // act
        const result = await storeService.create(storeDto);

        // assert
        const createdProduct = await storeService.create(storeDto);
        expect(createdProduct).toBeDefined();
        expect(createdProduct.id).toBeDefined();
        expect(createdProduct.name).toBe(storeDto.name);
        expect(createdProduct.city).toBe(storeDto.city);
        expect(createdProduct.address).toBe(storeDto.address);
        expect(result).toEqual(storeMock1);
    });

    // Tests para el método update()
    it('update => should find a user by a given id and update its data', async () => {
        //arrange
        const storeDto = {
            ...storeMock1
        } as StoreDto;

        jest.spyOn(mockStoreRepository, 'update').mockReturnValue(storeMock1);
        jest.spyOn(mockStoreRepository, 'preload').mockReturnValue(storeMock1);

        //act
        const result = await storeService.update(storeMock1.id, storeDto);
        expect(storeMock1).toBeDefined();
        expect(storeMock1.id).toBe(storeMock1.id);
        expect(storeMock1.name).toBe(storeDto.name);
        expect(storeMock1.city).toBe(storeDto.city);
        expect(storeMock1.address).toBe(storeDto.address);
        expect(result).toEqual(storeMock1);
    });

    // Tests para el método Delete()
    it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
        const id = 1;
        jest.spyOn(mockStoreRepository, 'remove').mockReturnValue(id);
        //act
        const result = await storeService.delete(id);
        expect(result).toEqual(id);
    });

})