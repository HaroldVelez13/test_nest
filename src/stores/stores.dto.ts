import { IsString, IsNotEmpty, MinLength, MaxLength, IsArray } from 'class-validator';
import { Product } from '../products/products.entity';
import { Type } from 'class-transformer';

export class StoreDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(3)
    city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    address: string;

    @IsArray()
    @Type(() => Product)
    products?: Product[];
}