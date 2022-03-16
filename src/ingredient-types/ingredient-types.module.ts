import { Module } from '@nestjs/common';
import { IngredientTypesService } from './ingredient-types.service';
import { IngredientTypesController } from './ingredient-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [PrismaModule, LoginModule],
  controllers: [IngredientTypesController],
  providers: [IngredientTypesService],
  exports: [IngredientTypesService],
})
export class IngredientTypesModule {}
