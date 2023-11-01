import { Produit } from "src/produits/entities/produit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    nom: string;

    @OneToMany(() => Produit, (produit) => produit.category)
    produits: Produit[];
}

