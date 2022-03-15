import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { OrderItensService } from 'src/order-itens/order-itens.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkNumber } from 'utils/checkNumber';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {

  constructor(
    private db: PrismaService,
    private login: LoginService,
    private orderItem: OrderItensService,
  ) { }

  async create(data: CreateOrderDto, user_id) {
    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("Usuário não Encontrado!");
    }

    data.address_id = checkNumber(data.address_id);
    const products = data.products;
    const quantities = data.quantities;
    const aditionOrders = data.aditions_itens;

    delete data.products;
    delete data.quantities;
    delete data.aditions_itens;

    const order = await this.db.order.create({
      data: {
        person_id,
        ...data,
      },
    });

    const order_id = order.id;

    const resultItens = await this.orderItem.create({ order_id, products, quantities, aditionOrders });

    await this.update(order_id, resultItens);

    return this.findOne(order_id, user_id);

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

  async update(order_id: number, totalPrice: any,) {
    return this.db.order.update({
      where: {
        id: order_id,
      },
      data: {
        total: totalPrice,
      }
    });
  }

  async updatePayment(order_id: number, payment_situation_id: number) {
    return this.db.order.update({
      where: {
        id: order_id,
      },
      data: {
        payment_situation_id,
      }
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
