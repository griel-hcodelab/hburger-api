import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';

@Injectable()
export class PaymentSituationsService {
    constructor (private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.paymentSituation.findMany();
    }

    async create(data: CreatePaymentSituationDto) {
        return this.prisma.paymentSituation.create({
            data
        });
    }
}
