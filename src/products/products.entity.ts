import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Store } from '../stores/stores.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', length: 150, nullable: false })
    name: string;

    @Column({ name: 'price', type: 'float', nullable: false })
    price: number;

    @Column({ name: 'type', length: 100, nullable: false })
    type: string;


    @ManyToMany(() => Store, (store) => store.products)
    stores: Store[];
}
