//  NOTAS:

// LINHA 50: Procurar um jeito prático de retornar os prices como decimal 2 dígitos; já que eles armazenam como 1 dígito, caso o último dígito seja zero, quando fazemos o toFxed(), quando eles retornam, também retornam como 1 dígito apenas.  Opção: corrigir no front end.

// LINHA 93: Seria Conveniente mudar o banco de dados deixar o nome dos ingredient_types como único, isso evitaria erro de duplicidade na hora de fazer a busca

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IngredientTypesService } from 'src/ingredient-types/ingredient-types.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkNumber } from 'utils/checkNumber';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    private db: PrismaService,
    private ingredientType: IngredientTypesService,
  ) {}

  // Auxiliar:

  async isThereId(id) {
    id = checkNumber(id);
    const ingredient = this.db.ingredient.findUnique({
      where: {
        id,
      },
    });
    if (!ingredient) {
      throw new NotFoundException('Ingredient Not Found!');
    }
    return id;
  }

  isValidData(data: CreateIngredientDto | UpdateIngredientDto) {
    if (!data.name || !data.description || !data.price) {
      throw new BadRequestException('One or more required fields are empty');
    }
    data.price = Number(data.price);
    /*
          data.price = data.price.toString()
    
          const priceArray = data.price.split(".")
          if(priceArray.length!=2 || priceArray[1].length!=2) {
            throw new BadRequestException("Incorrect Price Format")
          }
    
          data.price = priceArray[0] + "." + priceArray[1]
          data.price = parseFloat(data.price).toFixed(2)
    */
    data.ingredient_type_id = checkNumber(data.ingredient_type_id);

    return data as CreateIngredientDto;

    //Procurar um jeito prático de retornar os prices como decimal 2 dígitos; já que eles armazenam como 1 dígito, caso o último dígito seja zero, quando fazemos o toFxed(), quando eles retornam, também retornam como 1 dígito apenas.  Opção: corrigir no front end.
  }

  // CREATE
  async create(data: CreateIngredientDto) {
    data = this.isValidData(data);

    await this.ingredientType.findOne(data.ingredient_type_id);

    return this.db.ingredient.create({
      data,
    });
  }

  // READ
  async findAll() {
    return this.db.ingredient.findMany();
  }

  async findOne(id: number) {
    id = await this.isThereId(id);

    const ingredient = await this.db.ingredient.findUnique({
      where: {
        id,
      },
    });

    if (!ingredient) {
      throw new BadRequestException('Este ingrediente não existe!!');
    }

    return ingredient;
  }

  async findByType(id: number) {
    id = checkNumber(id);
    const ingredientType = await this.db.ingredientType.findUnique({
      where: {
        id,
      },
    });

    if (!ingredientType) {
      throw new NotFoundException('Ingredient Type Not Found');
    }

    const allByType = await this.db.ingredient.findMany({
      where: {
        ingredient_type_id: id,
      },
    });

    return allByType;
  }

  // UPDATE

  async update(id: number, data: UpdateIngredientDto) {
    id = await this.isThereId(id);

    data = this.isValidData(data);

    return this.db.ingredient.update({
      where: {
        id,
      },
      data,
    });
  }

  //DELETE

  async remove(id: number) {
    id = await this.isThereId(id);

    return this.db.ingredient.delete({
      where: {
        id,
      },
    });
  }
}
