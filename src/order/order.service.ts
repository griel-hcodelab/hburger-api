import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { OrderItensService } from 'src/order-itens/order-itens.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkNumber } from 'utils/checkNumber';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {

  constructor(
    private db: PrismaService,
    private login: LoginService,
    private orderItens: OrderItensService,
  ) { }

  async create(data: CreateOrderDto, user_id) {
    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("Usuário não Encontrado!");
    }

    data.address_id = checkNumber(data.address_id);
    data.payment_situation_id = checkNumber(data.payment_situation_id);
    const product_id = data.product_id.split(',');
    const quantity = data.quantity.split(',');

    const order = await this.db.order.create({
      data: {
        person_id,
        ...data,
      },
    });

    const order_id = order.id;
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

  async findOne(id, user_id) {
    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("Usuário não encontrado!");
    }

    if (isNaN(id)) {
      throw new NotFoundException("Id da Ordem não encontrada!");
    }

    const order = await this.db.order.findFirst({
      where: {
        id,
        person_id,
      }
    });

    if (!order) {
      throw new UnauthorizedException("Pedido não autorizado para consulta!");
    }

    return order;

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
