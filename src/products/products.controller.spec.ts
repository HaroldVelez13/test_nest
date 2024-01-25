import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsDto } from './products.dto';
import { mockProductService, productMock1, productMock2 } from './products.mocks';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
    let controller: ProductsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: mockProductService,
                },
            ],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // Tests para el método findAll()
    it('findAll => should return an array of user', async () => {
        //arrange

        const products = [productMock1, productMock2];
        jest.spyOn(mockProductService, 'findAll').mockReturnValue(products);
        //act
        const result = await controller.findAll();
        // assert
        expect(result).toEqual(products);
        expect(products.length).toBe(2);
        expect(products).toContain(productMock1);
        expect(products).toContain(productMock2);
    });

    // Tests para el método findOne()    
    it('findOne => should find a user by a given id and return its data', async () => {
        //arrange
        jest.spyOn(mockProductService, 'findOne').mockReturnValue(productMock1);
        //act
        const result = await controller.findOne(productMock1.id);
        expect(result).toEqual(productMock1);
        expect(result).toBeDefined();
        expect(result).toEqual(productMock1);
        expect(result.id).toBe(productMock1.id);
    });

    it('create => should create a new product by a given data', async () => {
        // arrange
        const productDto = {
            ...productMock1
        } as ProductsDto;

        jest.spyOn(mockProductService, 'create').mockReturnValue(productMock1);
        // act
        const result = await controller.create(productDto);
        // assert
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(productDto.name);
        expect(result.price).toBe(productDto.price);
        expect(result.type).toBe(productDto.type);
        expect(result).toEqual(productMock1);
    });


    // Tests para el método update()
    it('update => should find a user by a given id and update its data', async () => {
        //arrange
        const productDto = {
            ...productMock1
        } as ProductsDto;

        jest.spyOn(mockProductService, 'update').mockReturnValue(productMock1);
        //act
        const result = await controller.update(productMock1.id, productDto);
        expect(productMock1).toBeDefined();
        expect(productMock1.id).toBe(productMock1.id);
        expect(productMock1.name).toBe(productDto.name);
        expect(productMock1.price).toBe(productDto.price);
        expect(productMock1.type).toBe(productDto.type);
        expect(result).toEqual(productMock1);
    });

    // Tests para el método Delete()
    it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
        const productDto = {
            ...productMock1
        } as ProductsDto;

        jest.spyOn(mockProductService, 'delete').mockReturnValue(productMock1.id);
        //act
        const result = await controller.delete(productMock1.id);
        expect(result).toEqual(productMock1.id);
    });
});