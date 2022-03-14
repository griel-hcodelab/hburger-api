import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    PrismaModule,
    LoginModule
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService]
})
export class IngredientsModule {}
