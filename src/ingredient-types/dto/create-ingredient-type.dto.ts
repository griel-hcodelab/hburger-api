import {IsString } from "class-validator"

export class CreateIngredientTypeDto {
  @IsString()
  name: string
  
  @IsString()
  description: string

  repeatable: number
}
