import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    PrismaModule,
    LoginModule
  ],
  controllers: [
    ProductController
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule {}
