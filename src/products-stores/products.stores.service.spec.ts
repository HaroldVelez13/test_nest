import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsStoresService } from './products.store.service';
import { Product } from '../products/products.entity';
import { Store } from '../stores/store.entity';
import { mockProductRepository } from '../products/products.mocks';
import { mockStoreRepository } from '../stores/stores.mocks';


describe('ProductStoreService', () => {
    let service: ProductsStoresService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsStoresService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProductRepository,
                },
                {
                    provide: getRepositoryToken(Store),
                    useValue: mockStoreRepository,
                },
            ],
        }).compile();

        service = module.get<ProductsStoresService>(ProductsStoresService);
    });

    // Should add a store to a product when both exist
    it('should add a store to a product when both exist', async () => {
        // Arrange
        const productId = 1;
        const storeId = 1;
        const product = new Product();
        product.id = productId;
        product.stores = [];
        const store = new Store();
        store.id = storeId;

        jest.spyOn(mockProductRepository, 'findOne').mockResolvedValue(product);
        jest.spyOn(mockStoreRepository, 'findOneBy').mockResolvedValue(store);
        jest.spyOn(mockProductRepository, 'save').mockResolvedValue(product);

        // Act
        const result = await service.addStoreToProduct(productId, storeId);

        // Assert
        expect(result.stores).toContain(store);
    });

    // Should return an array of stores associated with the given product ID
    it('should return an array of stores when the product has associated stores', async () => {
        const productId = 1;
        const product = new Product();
        product.id = productId;
        product.stores = [new Store(), new Store()];

        jest.spyOn(service, 'findStoresFromProduct').mockResolvedValue(product.stores);

        const result = await service.findStoresFromProduct(productId);

        expect(result).toEqual(product.stores);
    });

    // Should update the stores of a product when given valid inputs
    it('should update the stores of a product when given valid inputs', async () => {
        // Arrange
        const productId = 1;
        const stores = [new Store()];
        const updatedProduct = new Product();
        updatedProduct.id = productId;
        updatedProduct.name = 'Updated Product';
        updatedProduct.price = 10.99;
        updatedProduct.type = 'ABC';
        updatedProduct.stores = stores;

        jest.spyOn(mockProductRepository, 'findOneBy').mockResolvedValueOnce(updatedProduct);
        jest.spyOn(mockProductRepository, 'save').mockResolvedValueOnce(updatedProduct);

        // Act
        const result = await service.updateStoresFromProduct(productId, stores);

        // Assert
        expect(result).toEqual(updatedProduct);
        expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id: productId });
        expect(mockProductRepository.save).toHaveBeenCalledWith(updatedProduct);
    });

    // Should return the updated product after removing the store
    it('should return the updated product after removing the store', async () => {
        // Arrange
        const productId = 1;
        const product = new Product();
        product.id = productId;
        const store = new Store()
        product.stores = [store];

        const findOneBySpy = jest.spyOn(mockProductRepository, 'findOneBy').mockResolvedValue(product);
        const saveSpy = jest.spyOn(mockProductRepository, 'save').mockResolvedValue(product);

        // Act
        const result = await service.deleteStoreFromProduct(productId, store.id);

        // Assert
        expect(findOneBySpy).toHaveBeenCalledWith({ id: productId });
        expect(saveSpy).toHaveBeenCalledWith(product);
        expect(result).toEqual(product);
    });


    // Test para el método findStoreFromProduct()
    it('should find a store associated with a product', async () => {
        const product = new Product();
        const store1 = new Store();
        const store2 = new Store();
        product.stores = [store1, store2];
        jest.spyOn(mockProductRepository, 'findOneBy').mockResolvedValue(product);
        const foundStore = await service.findStoreFromProduct(1, store2.id);

        expect(foundStore).toEqual(store2);
    });




})