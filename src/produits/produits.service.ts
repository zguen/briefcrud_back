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
  ) { }

  async create(createProduitDto: CreateProduitDto) {
    const produit = this.produitRepository.create(createProduitDto);
    const result = await this.produitRepository.save(produit);
    return result;
  }

  findAll() {
    return this.produitRepository.find();
  }

  async findOne(id: number) {
    const found = await this.produitRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`produit with the id ${id} not found`);
    }
    return found;
  }

  async update(id: number, updateproduitDto: UpdateProduitDto) {
    let produit = await this.findOne(id);

    const updatedproduit = this.produitRepository.merge(
      produit,
      updateproduitDto,
    );
    const result = await this.produitRepository.save(updatedproduit);
    return result;
  }

  async remove(id: number) {
    const produit = await this.findOne(id);
    const response = await this.produitRepository.remove(produit);
    return response;
  }
}
