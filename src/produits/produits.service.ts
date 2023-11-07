import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit) private produitRepository: Repository<Produit>,
  ) {}

  async create(createProduitDto: CreateProduitDto) {
    try {
      const produit = this.produitRepository.create(createProduitDto);
      const result = await this.produitRepository.save(produit);
      return result;
    } catch (error) {
      // Gérer l'erreur ici, par exemple, en enregistrant des journaux ou en lançant une exception personnalisée.
      throw new Error(
        'Une erreur est survenue lors de la création du produit.',
      );
    }
  }

  async findOne(id: number) {
    try {
      const found = await this.produitRepository.findOneBy({ id });
      if (!found) {
        throw new NotFoundException(`Produit with the id ${id} not found`);
      }
      return found;
    } catch (error) {
      // Gérer l'erreur ici, par exemple, en enregistrant des journaux ou en lançant une exception personnalisée.
      throw new Error(
        `Une erreur est survenue lors de la recherche du produit : ${error.message}`,
      );
    }
  }

  async update(id: number, updateproduitDto: UpdateProduitDto) {
    try {
      let produit = await this.findOne(id);
      const updatedproduit = this.produitRepository.merge(
        produit,
        updateproduitDto,
      );
      const result = await this.produitRepository.save(updatedproduit);
      return result;
    } catch (error) {
      // Gérer l'erreur ici, par exemple, en enregistrant des journaux ou en lançant une exception personnalisée.
      throw new Error(
        `Une erreur est survenue lors de la mise à jour du produit : ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const produit = await this.findOne(id);
      const response = await this.produitRepository.remove(produit);
      return response;
    } catch (error) {
      // Gérer l'erreur ici, par exemple, en enregistrant des journaux ou en lançant une exception personnalisée.
      throw new Error(
        `Une erreur est survenue lors de la suppression du produit : ${error.message}`,
      );
    }
  }
}
