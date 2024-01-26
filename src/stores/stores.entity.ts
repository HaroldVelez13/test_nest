import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', length: 150, nullable: false })
    name: string;

    @Column({ name: 'city', length: 3, nullable: false })
    city: string;

    @Column({ name: 'address', length: 250, nullable: false })
    address: string;

    @ManyToMany(() => Product, (product) => product.stores)
    @JoinTable()
    products?: Product[] | null;


}