import { Test, TestingModule } from '@nestjs/testing';
import { ProductsStoresService } from './products.store.service';
import { ProductsStoresController } from './products.stores.controller';
import { mockProducStoreService } from './products.stores.mocks';
import { Store } from '../stores/store.entity';
import { Product } from '../products/products.entity';


describe('UsersController', () => {
    let controller: ProductsStoresController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsStoresController],
            providers: [
                {
                    provide: ProductsStoresService,
                    useValue: mockProducStoreService,
                },
            ],
        }).compile();

        controller = module.get<ProductsStoresController>(ProductsStoresController);

    });

    // Should be able to find a specific store from a product
    it('should find a specific store from a product when given valid product and store IDs', async () => {
        // Arrange
        const productId = 1;
        const storeId = 1;
        const expectedStore = new Store();
        jest.spyOn(mockProducStoreService, 'findStoreFromProduct').mockResolvedValue(expectedStore);

        // Act
        const result = await controller.findStoreFromProduct(productId, storeId);

        // Assert
        expect(result).toEqual(expectedStore);
        expect(mockProducStoreService.findStoreFromProduct).toHaveBeenCalledWith(productId, storeId);
    });

    // Should be able to add a store to a product
    it('should add a store to a product when given a valid product ID and store ID', async () => {
        // Arrange
        const productId = 1;
        const storeId = 1;
        const expectedProduct = new Product();
        jest.spyOn(mockProducStoreService, 'addStoreToProduct').mockResolvedValue(expectedProduct);

        // Act
        const result = await controller.addStoreToProduct(productId, { storeId });

        // Assert
        expect(result).toEqual(expectedProduct);
        expect(mockProducStoreService.addStoreToProduct).toHaveBeenCalledWith(productId, storeId);
    });

    // Should throw an error if product is not found when finding stores from a product
    it('should throw an error if product is not found when finding stores from a product', async () => {
        // Arrange
        const productId = 1;
        jest.spyOn(mockProducStoreService, 'findStoresFromProduct').mockRejectedValue(new Error('No se encontró el producto'));

        // Act and Assert
        await expect(controller.findStoresFromProduct(productId)).rejects.toThrow('No se encontró el producto');
        expect(mockProducStoreService.findStoresFromProduct).toHaveBeenCalledWith(productId);
    });

    // Should throw an error if product is not found when finding a specific store from a product
    it('should throw an error if product is not found when finding a specific store from a product', async () => {
        // Arrange
        const productId = 1;
        const storeId = 1;
        jest.spyOn(mockProducStoreService, 'findStoreFromProduct').mockRejectedValue(new Error('No se encontró el producto'));

        // Act and Assert
        await expect(controller.findStoreFromProduct(productId, storeId)).rejects.toThrowError('No se encontró el producto');
        expect(mockProducStoreService.findStoreFromProduct).toHaveBeenCalledWith(productId, storeId);
    });

    // Should throw an error if product is not found when adding a store to a product
    it('should throw an error if product is not found when adding a store to a product', async () => {
        // Arrange
        const productId = 1;
        const storeId = 1;
        jest.spyOn(mockProducStoreService, 'addStoreToProduct').mockRejectedValue(new Error('No se encontró el producto'));

        // Act and Assert
        await expect(controller.addStoreToProduct(productId, { storeId })).rejects.toThrowError('No se encontró el producto');
        expect(mockProducStoreService.addStoreToProduct).toHaveBeenCalledWith(productId, storeId);
    });


});