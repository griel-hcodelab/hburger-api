<<<<<<< HEAD
import { IsString } from 'class-validator';

export class CreateIngredientTypeDto {
  @IsString()
  name: string;

=======
import {IsNotEmpty, IsString } from "class-validator"

export class CreateIngredientTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string
  
>>>>>>> 07cc6b8cb7ff1bd0250e912d567ae81e11f19693
  @IsString()
  description: string;

  repeatable: number;
}
