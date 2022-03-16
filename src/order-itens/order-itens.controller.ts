import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderItensService } from './order-itens.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Controller('orders-itens')
export class OrderItensController {
  constructor(private readonly orderItensService: OrderItensService) {}

  @Post()
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItensService.create(data);
  }

  @Get()
  findAll() {
    return this.orderItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItensService.findOrder(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItensService.remove(+id);
  }
}
