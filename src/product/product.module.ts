import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
  imports: [PrismaModule, LoginModule, IngredientsModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
