import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkNumber } from 'utils/checkNumber';
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

    if (isNaN(person_id)) {
      throw new NotFoundException("Usuário não Encontrado!");
    }

    data.address_id = checkNumber(data.address_id);
    data.payment_situation_id = checkNumber(data.payment_situation_id);

    return this.db.order.create({
      data: {
        person_id,
        ...data,
      },
    });
  }

  async findAll() {
    return this.db.order.findMany();
  }

  async findMe(user_id) {
    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("Usuário não Encontrado!");
    }

    return this.db.order.findMany({
      where: {
        person_id,
      }
    });
  }

  async findOne(id: number, user_id) {
    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("Usuário não encontrado!");
    }

    if (isNaN(id)) {
      throw new NotFoundException("Id da Ordem não encontrada!");
    }

    return this.db.order.findMany({
      where: {
        id,
        person_id,
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
