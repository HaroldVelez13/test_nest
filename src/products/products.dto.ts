import { IsString, IsNotEmpty, MinLength, IsNumber, MaxLength, IsEnum } from 'class-validator';
import { TypesEnum } from './products.type.enum';

export class ProductDto {
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

}