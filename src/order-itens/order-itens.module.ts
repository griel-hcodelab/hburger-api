import { Module } from '@nestjs/common';
import { OrderItensService } from './order-itens.service';
import { OrderItensController } from './order-itens.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { ProductModule } from 'src/product/product.module';
import { OrderIgredientsModule } from 'src/order-igredients/order-igredients.module';

@Module({
  imports: [
    PrismaModule,
    IngredientsModule,
    ProductModule,
    OrderIgredientsModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: Number(process.env.JWT_EXPIRE),
        },
      }),
    }),
  ],
  controllers: [OrderItensController],
  providers: [OrderItensService],
  exports: [OrderItensService],
})
export class OrderItensModule {}
