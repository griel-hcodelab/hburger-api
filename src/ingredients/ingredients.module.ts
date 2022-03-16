import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginModule } from 'src/login/login.module';
import { IngredientTypesModule } from 'src/ingredient-types/ingredient-types.module';

@Module({
  imports: [PrismaModule, LoginModule, IngredientTypesModule],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
