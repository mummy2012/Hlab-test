import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslation } from './product-translation.entity';
import { ProductTranslationService } from './product-translation.service';
import { ProductTranslationController } from './product-translation.controller';



@Module({
  imports: [TypeOrmModule.forFeature([ProductTranslation])],
  controllers: [ProductTranslationController],
  providers: [ProductTranslationService],
  exports: [ProductTranslationService], 
})
export class ProductTranslationModule {}
