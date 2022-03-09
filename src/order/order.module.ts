import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';
import { OrderItensModule } from 'src/order-itens/order-itens.module';

@Module({
  imports: [
    PrismaModule,
    LoginModule,
    OrderItensModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
  ]
})
export class OrderModule { }
