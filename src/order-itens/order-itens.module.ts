import { Module } from '@nestjs/common';
import { OrderItensService } from './order-itens.service';
import { OrderItensController } from './order-itens.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';

@Module({
  imports: [
    PrismaModule,
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
})
export class OrderItensModule { }
