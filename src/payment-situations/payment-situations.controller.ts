import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { PaymentSituationsService } from './payment-situations.service';

@Controller('payment-situations')
export class PaymentSituationsController {
    constructor (private paymentSituationsService: PaymentSituationsService) {}

    @Get('/')
    async findAll() {
        return this.paymentSituationsService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id) {
        return this.paymentSituationsService.findOne(id);
    }

    @Post('/')
    async create(@Body() data: CreatePaymentSituationDto) {
        return this.paymentSituationsService.create(data);
    }
}
