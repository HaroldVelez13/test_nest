import { TypesEnum } from "./products.type.enum";

export const mockProductRepository = {
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    preload: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
};

export const productMock1 = {
    id: Date.now(),
    name: 'Product one',
    price: 100,
    type: TypesEnum.PERECEDERO,
};;
export const productMock2 =
{
    id: Date.now() + 1,
    name: 'Product Two',
    price: 200,
    type: TypesEnum.NO_PERECEDERO,
};

export const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};