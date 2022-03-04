import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';

@Injectable()
export class IngredientTypesService {

  constructor(
    private db: PrismaService
  ){}

  //Auxiliar :
    isValidNumber(number, nome: string){
      number = Number(number)
      if(isNaN(number)) {
        throw new BadRequestException(`${nome} Inválido`)
      }
      return number
    }

    async isThereId(id: number) {
      id = this.isValidNumber(id, "Id")
      const ingredientType = this.db.ingredientType.findUnique({
        where: {
          id
        }
      })
      if(!ingredientType) {
        throw new NotFoundException("Ingredient Type Não Encontrado")
      }
      return id
    }

  //CREATE

  async create(data: CreateIngredientTypeDto) {
    
    return this.db.ingredientType.create({
      data
    })
  }

  //READ

  async findAll() {
    this.db.ingredientType.findMany()
  }

  async findOne(id: number) {

    id = await this.isThereId(id)

    return this.db.ingredientType.findUnique({
      where: {
        id
      }
    })
  }

  //UPDATE

  async update(id: number, data: UpdateIngredientTypeDto) {
    id = await this.isThereId(id)

    return this.db.ingredientType.update({
      where: {
        id
      },
      data
    })
  }

  //DELETE
  async remove(id: number) {

    id = await this.isThereId(id)
    return this.db.ingredientType.delete({
      where: {
        id
      }
    })
  }
}
