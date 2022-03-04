import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
        PrismaModule, 
        AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
