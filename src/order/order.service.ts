import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { LoginService } from 'src/login/login.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { checkNumber } from 'utils/checkNumber';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {

  constructor(
    private db: PrismaService,
    private login: LoginService,
    private ingredients: IngredientsService,
    private products: ProductService,
  ) { }

  async create(data: CreateOrderDto, user_id) {
    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("Usuário não Encontrado!");
    }


    let priceTotal = [];

    data.address_id = checkNumber(data.address_id);
    data.payment_situation_id = checkNumber(data.payment_situation_id);
    const products = data.products.split(',');
    const quantity = data.quantities.split(',');
    const aditionOrder = data.aditions_itens.split('|');

    let resultItens;
    for (let i = 0; i < aditionOrder.length; i++) {
      let itens = aditionOrder[i].split(',');
      for (let i = 0; i < itens.length; i++) {
        resultItens = await this.ingredients.findOne(+itens[i]);
        if (resultItens) {
          priceTotal.push(resultItens.price);
        }
      }
    }

    for (let i = 0; i <= products.length - 1; i++) {
      const resultProduct = await this.products.findOne(+products[i]);
      priceTotal.push(resultProduct.price);
    }
    const totalPrice = priceTotal.reduce((total, atual) => {
      return parseFloat(total) + parseFloat(atual)
    });

    console.log(totalPrice);

    for (let i = 0; i <= quantity.length - 1; i++) {
      quantity[i];
    }
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
