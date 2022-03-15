import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderIgredientsService } from './order-igredients.service';
import { CreateOrderIgredientDto } from './dto/create-order-igredient.dto';
import { UpdateOrderIgredientDto } from './dto/update-order-igredient.dto';

@Controller('order-igredients')
export class OrderIgredientsController {
  constructor(private readonly orderIgredientsService: OrderIgredientsService) {}

  @Post()
  create(@Body() createOrderIgredientDto: CreateOrderIgredientDto) {
    return this.orderIgredientsService.create(createOrderIgredientDto);
  }

  @Get()
  findAll() {
    return this.orderIgredientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderIgredientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderIgredientDto: UpdateOrderIgredientDto) {
    return this.orderIgredientsService.update(+id, updateOrderIgredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderIgredientsService.remove(+id);
  }
}
