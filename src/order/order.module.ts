import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    PrismaModule,
    LoginModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
  ]
})
export class OrderModule { }
