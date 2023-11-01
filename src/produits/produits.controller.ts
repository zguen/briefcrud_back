import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createProduitDto: CreateProduitDto) {
    return this.produitsService.create(createProduitDto);
  }

  @Get()
  findAll() {
    return this.produitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitsService.findOne(+id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitsService.update(+id, updateProduitDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitsService.remove(+id);
  }
}
