import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientTypeDto } from './create-ingredient-type.dto';

export class UpdateIngredientTypeDto extends PartialType(
  CreateIngredientTypeDto,
) {}
