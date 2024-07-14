import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTranslation } from './product-translation.entity';
import { UpsertProductTranslateItem } from './dto/bulk-upsert-product-translation.dto'
import { SearchProductTranslationDto } from './dto/search-product-translation.dto';

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
            console.error('Error while upsert product translation:', e?.message);
            throw new Error('Failed to upsert product translation');
        }
    }

    async search(searchDto: SearchProductTranslationDto): Promise<{ data: ProductTranslation[], totalItems: number, totalPages: number, currentPage: number }> {
        const query = this.ProductTranslationRepository.createQueryBuilder('productTranslation');
      
        if (searchDto.name) {
          query.andWhere('productTranslation.name LIKE :name', { name: `%${searchDto.name}%` });
        }
      
        if (searchDto.language) {
          query.andWhere('productTranslation.language = :language', { language: searchDto.language });
        }
      
        const page = searchDto.page || 1;
        const limit = searchDto.limit || 10;
        query.skip((page - 1) * limit).take(limit);
      
        const [data, totalItems] = await query.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);
      
        return { data, totalItems, totalPages, currentPage: page };
      }

}