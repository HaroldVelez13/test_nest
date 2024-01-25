import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Store } from '../stores/store.entity';
import { TypesEnum } from './products.type.enum';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', length: 150, nullable: false })
    name: string;

    @Column({ name: 'price', type: 'float', nullable: false })
    price: number;

    @Column({ name: 'varchar', length: 3, nullable: false })
    type: string;


    @ManyToMany(() => Store, (store) => store.products)
    stores: Store[];
}
