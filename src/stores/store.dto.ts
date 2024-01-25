import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

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
}