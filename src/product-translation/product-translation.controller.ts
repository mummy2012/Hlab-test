// src/product-translation/product-translation.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { ProductTranslationService } from './product-translation.service';
import { SearchProductTranslationDto } from './dto/search-product-translation.dto';
import { ProductTranslation } from './product-translation.entity';

@Controller('product-translations')
export class ProductTranslationController {
  constructor(private readonly productTranslationService: ProductTranslationService) {}

  @Get('search')
  async search(@Query() searchDto: SearchProductTranslationDto):Promise<{ data: ProductTranslation[], totalItems: number, totalPages: number, currentPage: number }> {    
    return this.productTranslationService.search(searchDto);
  }
}
