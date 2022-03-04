import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { PaymentSituationsService } from './payment-situations.service';

@Controller('payment-situations')
export class PaymentSituationsController {
    constructor (private paymentSituationsService: PaymentSituationsService) {}

    @Get('/')
    async findAll() {
        return this.paymentSituationsService.findAll();
    }

    @Post('/')
    async create(@Body() data: CreatePaymentSituationDto) {
        return this.paymentSituationsService.create(data);
    }
}
