import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { LoginGuard } from 'src/login/login.guard';
import { Login } from 'src/login/login.decorator';
import { checkNumber } from 'utils/checkNumber';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(LoginGuard)
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Login('id') user_id) {
    return this.orderService.create(createOrderDto, user_id);
  }

  @UseGuards(LoginGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(LoginGuard)
  @Get('/me')
  findMe(@Login('id') user_id) {
    return this.orderService.findMe(user_id);
  }

  @UseGuards(LoginGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: Number,
    @Login('id') user_id) {
    return this.orderService.findOne(id, user_id);
  }

  @UseGuards(LoginGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('payment_situation_id') payment_situation_id: string,) {
    const order_id = checkNumber(id);
    const payment_situation = checkNumber(payment_situation_id);
    return this.orderService.updatePayment(order_id, payment_situation);
  }

  @UseGuards(LoginGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
