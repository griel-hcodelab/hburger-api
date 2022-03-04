import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentSituationsService {
    constructor (private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.paymentSituation.findMany();
    }
}
