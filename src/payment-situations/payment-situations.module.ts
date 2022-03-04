import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentSituationsController } from './payment-situations.controller';
import { PaymentSituationsService } from './payment-situations.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentSituationsController],
  providers: [PaymentSituationsService],
  exports: [PaymentSituationsService],
})
export class PaymentSituationsModule {}
