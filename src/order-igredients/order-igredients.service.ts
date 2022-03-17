import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderIgredientDto } from './dto/create-order-igredient.dto';

@Injectable()
export class OrderIgredientsService {
  constructor(private db: PrismaService) {}

  async create(data: CreateOrderIgredientDto) {
    await this.db.orderIngredient.create({
      data,
    });
    return true;
  }

  findAll() {
    return `This action returns all orderIgredients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderIgredient`;
  }

  update(id: number) {
    return `This action updates a #${id} orderIgredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderIgredient`;
  }
}
