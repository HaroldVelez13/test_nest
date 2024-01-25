

export const mockStoreRepository = {
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    preload: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
};

export const storeMock1 = {
    id: Date.now(),
    name: 'Store one',
    city: "COL",
    address: "Address one",
};;
export const storeMock2 =
{
    id: Date.now() + 1,
    name: 'Store Two',
    city: "ARG",
    address: "Address Two",
};

export const mockStoreService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};