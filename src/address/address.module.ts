import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';
import { MailModule } from 'src/mail/mail.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PrismaModule,
    MailModule,
    HttpModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: Number(process.env.JWT_EXPIRE),
        },
      }),
    }),
  ],
  controllers: [AddressController],
  providers: [AddressService, LoginService],
})
export class AddressModule {}
