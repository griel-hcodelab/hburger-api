import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from 'src/login/login.guard';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';
import { PaymentSituationsService } from './payment-situations.service';

@Controller('payment-situations')
export class PaymentSituationsController {
  constructor(private paymentSituationsService: PaymentSituationsService) {}

  @Get('/')
  async findAll() {
    return this.paymentSituationsService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id) {
    return this.paymentSituationsService.findOne(id);
  }

  @UseGuards(LoginGuard)
  @Post('/')
  async create(@Body() data: CreatePaymentSituationDto) {
    return this.paymentSituationsService.create(data);
  }

  @UseGuards(LoginGuard)
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdatePaymentSituationDto,
  ) {
    return this.paymentSituationsService.update(id, data);
  }

  @UseGuards(LoginGuard)
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.paymentSituationsService.delete(id);
  }
}
