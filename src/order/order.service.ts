import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {

  constructor(
    private db: PrismaService,
  ) { }

  async create(data: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    return this.db.order.findMany();
  }

  async findOne(id: number) {
    return this.db.order.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, data: UpdateOrderDto) {
    return this.db.order.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.db.order.delete({
      where: {
        id,
      }
    });
  }
}
