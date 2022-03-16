import { BadRequestException, Injectable } from '@nestjs/common';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkNumber } from 'utils/checkNumber';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private ingrediente: IngredientsService,
  ) {}

  async create({ name, description, price, ingredients }: CreateProductDto) {
    const alreadyExist = await this.prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (alreadyExist) {
      throw new BadRequestException('Name already exist');
    }

    if (ingredients) {
      const varing = ingredients.split(',');
      for (let i = 0; i <= varing.length - 1; i++) {
        const ingredient_Id = checkNumber(varing[i]);
        const ingredient_Exist = await this.ingrediente.findOne(ingredient_Id);
        if (!ingredient_Exist) {
          throw new BadRequestException('Ingredient not found');
        }
      }
    }

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });

    if (ingredients) {
      const varing = ingredients.split(',');
      for (let i = 0; i <= varing.length - 1; i++) {
        await this.prisma.productIngredient.create({
          data: {
            product_id: Number(product.id),
            ingredient_id: +varing[i],
          },
        });
      }
    }

    return product;
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id: checkNumber(id),
      },
    });
  }

  async update(
    id: number,
    { name, description, price, ingredients }: UpdateProductDto,
  ) {
    if (name) {
      const alreadyExist = await this.prisma.product.findFirst({
        where: {
          name: name,
        },
      });
      if (alreadyExist) {
        if (id !== alreadyExist.id) {
          throw new BadRequestException('Name already exist');
        }
      }
    }
    if (price) {
      checkNumber(price, 'Invalid price');
    }
    if (ingredients) {
      if (ingredients == 'Excluir') {
        //remove os ingredientes
        this.removeIngredients(id);
      } else {
        // Verifica se os ingredientes são válidos
        const varing = ingredients.split(',');
        for (let i = 0; i <= varing.length - 1; i++) {
          checkNumber(varing[i], 'Ingredient invalid');
        }
        // Verifica se os ingredientes existem na Base de dados
        for (let i = 0; i <= varing.length - 1; i++) {
          const itemFound = await this.prisma.ingredient.findUnique({
            where: {
              id: +varing[i],
            },
          });
          if (!itemFound) {
            throw new BadRequestException('Ingredient not found');
          }
        }
        await this.removeIngredients(id);
        for (let i = 0; i <= varing.length - 1; i++) {
          await this.prisma.productIngredient.create({
            data: {
              product_id: Number(id),
              ingredient_id: +varing[i],
            },
          });
        }
      }
    }
    return this.prisma.product.update({
      data: { name, description, price },
      where: {
        id: checkNumber(id),
      },
    });
  }

  async removeIngredients(id: number) {
    const ingredientExist = await this.prisma.productIngredient.findMany({
      where: {
        product_id: id,
      },
    });
    if (ingredientExist) {
      await this.prisma.productIngredient.deleteMany({
        where: {
          product_id: +id,
        },
      });
    }
  }
  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new BadRequestException('Product not found');
    }
    return this.prisma.product.delete({
      where: {
        id: checkNumber(id),
      },
    });
  }

  async findIngredientsByProduct(id: number) {
    const product = await this.findOne(id);
    const ingredientExist = await this.prisma.productIngredient.findMany({
      where: {
        product_id: id,
      },
      include: {
        ingredients: true,
      },
    });
    return { product, ingredientExist };
  }
}
