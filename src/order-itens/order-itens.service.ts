import { BadRequestException, Injectable } from '@nestjs/common';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { OrderIgredientsService } from 'src/order-igredients/order-igredients.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItensService {
  constructor(
    private db: PrismaService,
    private ingredients: IngredientsService,
    private products: ProductService,
    private orderIgredient: OrderIgredientsService,
  ) {}

  async create(data: CreateOrderItemDto) {
    
    const products = data.products.split(',');

    let aditionOrder: string;
    if (data.aditionOrders) {
      aditionOrder = data.aditionOrders.split('|');
    }
    const order_id = data.order_id;



    let orderItem;
    let price = 0;
    let product_name;
    let product_id;
    let quantity;
    let priceTotal = 0;

    let resultItens;
    let resultProduct;
    let priceUpdate = 0;

    for (let i = 0; i <= products.length - 1; i++) {
      resultProduct = await this.products.findOne(+products[i]);

      quantity = 1;

      price = resultProduct.price * quantity;
      product_name = resultProduct.name;
      product_id = resultProduct.id;

      orderItem = await this.db.orderItem.create({
        data: {
          order_id: order_id,
          product_id: product_id,
          product_name: product_name,
          price: price,
          quantity,
        },
      });

      const priceProduct = orderItem.price;
      const order_items_id = orderItem.id;

      if (aditionOrder) {
        const itens = aditionOrder[i].split(',');
        let priceItens = 0;

        for (let j = 0; j < itens.length; j++) {
          if (itens[j] != '') {
            resultItens = await this.ingredients.findOne(+itens[j]);

            const ingredients_id = resultItens.id;
            priceItens += Number(resultItens.price);

            await this.orderIgredient.create({
              order_items_id,
              ingredients_id,
            });
          }
        }

        priceUpdate = Number(priceProduct) + Number(priceItens) * quantity;

        priceTotal += priceUpdate;
      } else {
        priceTotal += Number(priceProduct);
      }

      await this.update(order_items_id, priceUpdate);
    }

    return priceTotal;
  }

  async update(id: number, price: number) {
    return this.db.orderItem.update({
      where: {
        id,
      },
      data: {
        price,
      },
    });
  }

  async findAll() {
    return this.db.orderItem.findMany();
  }

  async findOrder(order_id: number) {
    return this.db.orderItem.findMany({
      where: {
        order_id,
      },
    });
  }

  async remove(id: number) {
    return this.db.orderItem.delete({
      where: {
        id,
      },
    });
  }
}
