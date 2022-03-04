import { Module } from '@nestjs/common';
import { IngredientTypesService } from './ingredient-types.service';
import { IngredientTypesController } from './ingredient-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [IngredientTypesController],
  providers: [IngredientTypesService]
})
export class IngredientTypesModule {}
