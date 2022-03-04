import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaService, PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }