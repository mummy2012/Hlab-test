import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTranslation } from './product-translation.entity';
import { UpsertProductTranslateItem } from './dto/product-translation-bulk-upsert.dto'

@Injectable()
export class ProductTranslationService {

	constructor(       
        @InjectRepository(ProductTranslation)
        private ProductTranslationRepository: Repository<ProductTranslation>
    ) {
	}

	async upsert(input: UpsertProductTranslateItem):Promise<void> {
        try {
            let productTranslation = await this.ProductTranslationRepository.findOne({
                where: {
                    productId: input.productId,
                    language: input.language,
                },
            });

            if (productTranslation) {
                productTranslation.name = input.name;
                productTranslation.description = input.description;
            } else {
                productTranslation = new ProductTranslation();
                productTranslation.productId = input.productId;
                productTranslation.language = input.language;
                productTranslation.name = input.name;
                productTranslation.description = input.description;
            }
            await this.ProductTranslationRepository.save(productTranslation);
        } catch (e) {
            console.error('Error while upserting product translation:', e?.message);
            throw new Error('Failed to upsert product translation');
        }
    }

}