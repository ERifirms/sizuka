import { Product } from 'src/products/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratting: number;

  @Column()
  body: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;
}
