import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nom: string;

  @Column({ nullable: false })
  prix: number;

  @Column({ nullable: false, type: 'int' })
  quantite: number;

  @Column({ nullable: false, type: 'int' })
  id_categorie: number;

  @ManyToOne(() => Category, (category) => category.produits, { eager: true })
  @JoinColumn({ name: 'id_categorie' })
  category: Category;
}
