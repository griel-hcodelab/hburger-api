import { Injectable } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {

  constructor(
    private db: PrismaService,
    private login: LoginService,

  ) { }

  async create(data: CreateOrderDto, user_id) {
    const person_id = await this.login.getPersonId(user_id);

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
