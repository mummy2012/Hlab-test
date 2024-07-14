import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertProductTranslateItem {
    @IsString()
    @IsOptional()
    productId?:string;

    @IsString()
    @IsNotEmpty()
    language: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
}
