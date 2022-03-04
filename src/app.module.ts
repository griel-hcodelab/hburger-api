import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientTypesModule } from './ingredient-types/ingredient-types.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    PrismaModule, IngredientTypesModule, IngredientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
