import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsStoresService } from './products.stores.service';
import { Product } from '../products/products.entity';
import { Store } from '../stores/stores.entity';
import { mockProductRepository } from '../products/products.mocks';
import { mockStoreRepository } from '../stores/stores.mocks';
import { In } from 'typeorm';


describe('ProductsStoresService', () => {
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

    // should update the stores associated with the product when given valid product and store ids
    it('should update the stores when given valid product and store ids', async () => {
        // Arrange
        const productId = 1;
        const storesId = [1, 2];
        const product = new Product();
        product.id = productId;
        const stores: Store[] = [
            { id: 1, name: 'Store 1', city: "ARM", address: "address 1", products: null },
            { id: 2, name: 'Store 2', city: "CAL", address: "address 2", products: null }
        ];
        const updatedProduct = new Product();
        updatedProduct.id = productId;
        updatedProduct.stores = stores;

        jest.spyOn(mockProductRepository, 'findOneBy').mockResolvedValue(product);
        jest.spyOn(mockStoreRepository, 'find').mockResolvedValue(stores);
        jest.spyOn(mockProductRepository, 'save').mockResolvedValue(updatedProduct);

        // Act
        const result = await service.updateStoresFromProduct(productId, storesId);

        // Assert
        expect(result).toEqual(updatedProduct);
        expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id: productId });
        expect(mockStoreRepository.find).toHaveBeenCalledWith({ where: { id: In(storesId) } });
        expect(mockProductRepository.save).toHaveBeenCalledWith(updatedProduct);
    });

    // Should return the updated product after deleting the store
    it('should return the updated product after deleting the store', async () => {
        // Arrange
        const productId = 1;
        const storeId = 1;
        const product = new Product();
        product.id = productId;
        const new_store = { id: storeId, name: 'Store 1', city: "ARM", address: "address 1", products: null }
        product.stores = [new_store];
        const store = new Store();
        store.id = storeId;
        jest.spyOn(mockStoreRepository, 'remove').mockResolvedValue(undefined);
        jest.spyOn(mockProductRepository, 'save').mockResolvedValue(product);
        jest.spyOn(mockProductRepository, 'findOne').mockResolvedValue(product);

        // Act
        const result = await service.deleteStoreFromProduct(productId, storeId);

        // Assert
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