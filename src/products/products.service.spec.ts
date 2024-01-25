import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsDto } from './products.dto';
import { mockProductRepository, productMock1, productMock2 } from './products.mocks';


describe('ProductsService', () => {
    let productService: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProductRepository,
                },
            ],
        }).compile();

        productService = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(productService).toBeDefined();
    });

    // Tests para el método findAll()
    it('should return all products', async () => {
        const products = [productMock1, productMock2];
        jest.spyOn(mockProductRepository, 'find').mockReturnValue(products);
        //act
        const result = await productService.findAll();
        // assert
        expect(result).toEqual(products);
        expect(products.length).toBe(2);
        expect(products).toContain(productMock1);
        expect(products).toContain(productMock2);
    });

    // Tests para el método findOne()
    it('findOne => should find a product by a given id and return its data', async () => {
        //arrange   
        jest.spyOn(mockProductRepository, 'findOneBy').mockReturnValue(productMock1);
        //act
        const result = await productService.findOne(productMock1.id);
        expect(result).toBeDefined();
        expect(result).toEqual(productMock1);
        expect(result.id).toBe(productMock1.id);
    });

    // Tests para el método create()
    it('create => Should create a new user and return its data', async () => {
        // arrange
        const productDto = {
            ...productMock1
        } as ProductsDto;


        jest.spyOn(mockProductRepository, 'save').mockReturnValue(productMock1);
        jest.spyOn(mockProductRepository, 'create').mockReturnValue(productMock1);
        // act
        const result = await productService.create(productDto);

        // assert
        const createdProduct = await productService.create(productDto);
        expect(createdProduct).toBeDefined();
        expect(createdProduct.id).toBeDefined();
        expect(createdProduct.name).toBe(productDto.name);
        expect(createdProduct.price).toBe(productDto.price);
        expect(createdProduct.type).toBe(productDto.type);
        expect(result).toEqual(productMock1);
    });

    // Tests para el método update()
    it('update => should find a user by a given id and update its data', async () => {
        //arrange
        const productDto = {
            ...productMock1
        } as ProductsDto;


        jest.spyOn(mockProductRepository, 'update').mockReturnValue(productMock1);
        jest.spyOn(mockProductRepository, 'preload').mockReturnValue(productMock1);

        //act
        const result = await productService.update(productMock1.id, productDto);
        expect(productMock1).toBeDefined();
        expect(productMock1.id).toBe(productMock1.id);
        expect(productMock1.name).toBe(productDto.name);
        expect(productMock1.price).toBe(productDto.price);
        expect(productMock1.type).toBe(productDto.type);
        expect(result).toEqual(productMock1);
    });

    // Tests para el método Delete()
    it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
        const id = 1;
        jest.spyOn(mockProductRepository, 'remove').mockReturnValue(id);
        //act
        const result = await productService.delete(id);
        expect(result).toEqual(id);
    });

})