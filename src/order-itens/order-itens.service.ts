import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItensService {

  constructor(
    private db: PrismaService,
  ) { }

  async create(data: CreateOrderItemDto) {

  }

  async findAll() {
    return this.db.orderItem.findMany();
  }

  async findOrder(order_id: number) {
    return this.db.orderItem.findMany({
      where: {
        order_id,
      }
    });
  }

  async remove(id: number) {
    return this.db.orderItem.delete({
      where: {
        id,
      }
    });
  }
}
