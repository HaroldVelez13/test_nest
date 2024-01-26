import { IsString, IsNotEmpty, MinLength, IsNumber, MaxLength, IsEnum, IsArray } from 'class-validator';
import { TypesEnum } from './products.type.enum';
import { Store } from '../stores/stores.entity';
import { Type } from 'class-transformer';

export class ProductsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(150)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsEnum(TypesEnum)
    type: TypesEnum;


    @IsArray()
    @Type(() => Store)
    stores?: Store[] | null

}