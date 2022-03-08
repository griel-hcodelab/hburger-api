import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { LoginGuard } from 'src/login/login.guard';
import { Login } from 'src/login/login.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(LoginGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto,
    @Login() login) {
    return this.orderService.create(createOrderDto, login.user_id);
  }

  @UseGuards(LoginGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(LoginGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(LoginGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @UseGuards(LoginGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
