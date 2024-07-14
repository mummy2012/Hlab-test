import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductTranslationModule } from 'src/product-translation/product-translation.module';



@Module({
  imports: [TypeOrmModule.forFeature([Product]),ProductTranslationModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
