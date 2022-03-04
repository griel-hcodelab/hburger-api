import { Module } from '@nestjs/common';
import { LoginModule } from 'src/login/login.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentSituationsController } from './payment-situations.controller';
import { PaymentSituationsService } from './payment-situations.service';

@Module({
  imports: [PrismaModule, LoginModule],
  controllers: [PaymentSituationsController],
  providers: [PaymentSituationsService],
  exports: [PaymentSituationsService],
})
export class PaymentSituationsModule {}
