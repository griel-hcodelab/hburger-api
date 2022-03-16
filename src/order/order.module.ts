import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { ProductModule } from 'src/product/product.module';
import { OrderItensModule } from 'src/order-itens/order-itens.module';

@Module({
  imports: [
    PrismaModule,
    LoginModule,
    IngredientsModule,
    ProductModule,
    OrderItensModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
