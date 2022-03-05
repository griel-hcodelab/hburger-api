import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { PaymentSituationsModule } from './payment-situations/payment-situations.module';

@Module({
  imports: [
    PrismaModule,
    AddressModule,
    LoginModule,
    PaymentSituationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
