import {
    Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Injectable,
	Param,
	Post,
	Scope,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service';
import { ProductTranslationService } from 'src/product-translation/product-translation.service';


@Controller('product')
@Injectable({ scope: Scope.REQUEST })
export class ProductController {

	constructor(
        private readonly productService: ProductService,
        private readonly productTranslationService: ProductTranslationService

	) {}

	@Post('/create')
	async createProduct(@Body() body: CreateProductDto) {
        try{
            let productId = body.id
            if(!productId){
                const product = await this.productService.create()
                productId = product.id
            }

            if(body.productTranslateItems.length){
                await Promise.all(
                    body.productTranslateItems.map(item =>
                      this.productTranslationService.upsert({
                        productId: productId,
                        language: item.language,
                        name: item.name,
                        description: item.description,
                      }),
                    ),
                  );
            }
        
              return { success: true };

        }catch(e){
            console.log(e?.message);     
        }
        
	}

}