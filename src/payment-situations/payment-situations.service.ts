import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';

@Injectable()
export class PaymentSituationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.paymentSituation.findMany();
  }

  async findOne(id: number) {
    const paymentSituation = await this.prisma.paymentSituation.findUnique({
      where: { id },
    });

    if (!paymentSituation) {
      throw new NotFoundException('Situação de Pagamento não encontrada.');
    }

    return paymentSituation;
  }

  async create(data: CreatePaymentSituationDto) {
    return this.prisma.paymentSituation.create({
      data,
    });
  }

  async update(id: number, data: UpdatePaymentSituationDto) {
    await this.findOne(id);

    return this.prisma.paymentSituation.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findOne(id);

    return this.prisma.paymentSituation.delete({
      where: { id },
    });
  }
}
