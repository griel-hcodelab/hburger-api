import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/login/login.guard';
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

    @UseGuards(LoginGuard)
    @Post('/')
    async create(@Body() data: CreatePaymentSituationDto) {
        return this.paymentSituationsService.create(data);
    }
}
