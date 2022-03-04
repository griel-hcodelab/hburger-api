import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [
        AddressController,],
    providers: [
        AddressService,],
})
export class AddressModule { }
