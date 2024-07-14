import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
@Unique(['productId', 'language'])
export class ProductTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  productId: string;

  @Column()
  language: string;

  @Column()
  name: string;

  @Column('text')
  description: string;
}
