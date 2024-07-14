import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslation } from './product-translation.entity';
import { ProductTranslationService } from './product-translation.service';



@Module({
  imports: [TypeOrmModule.forFeature([ProductTranslation])],
  providers: [ProductTranslationService],
  exports: [ProductTranslationService], 
})
export class ProductTranslationModule {}
