import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { OrderModule } from './order/order.module';
import { OrderItensModule } from './order-itens/order-itens.module';

@Module({
  imports: [
        PrismaModule, LoginModule, OrderModule, OrderItensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
