import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UpsertProductTranslateItem {
    @IsString()
    @IsNotEmpty()
    productId:string;

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
