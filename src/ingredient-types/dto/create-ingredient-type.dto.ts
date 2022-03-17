import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  repeatable: number;
}
