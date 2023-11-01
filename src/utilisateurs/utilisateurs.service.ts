import { Injectable, NotFoundException } from '@nestjs/common';
import { Utilisateur } from './entities/utilisateur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async findOne(id: number) {
    const found = await this.utilisateurRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Utilisateur with the id ${id} not found`);
    }
    return found;
  }
}