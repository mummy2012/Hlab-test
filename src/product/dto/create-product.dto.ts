import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpsertProductTranslateItem } from '../../product-translation/dto/bulk-upsert-product-translation.dto'

export class CreateProductDto {
  @IsString()
  @IsOptional()
  id?:string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  productTranslateItems: UpsertProductTranslateItem[];

}
