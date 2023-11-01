import { Review } from 'src/reviews/review.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @Column()
  description: string;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
