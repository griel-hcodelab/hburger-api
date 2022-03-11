import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    PrismaModule,
    LoginModule,
    IngredientsModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
  ]
})
export class OrderModule { }
