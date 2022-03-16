import { Module } from '@nestjs/common';
import { OrderIgredientsService } from './order-igredients.service';
import { OrderIgredientsController } from './order-igredients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderIgredientsController],
  providers: [OrderIgredientsService],
  exports: [OrderIgredientsService],
})
export class OrderIgredientsModule {}
