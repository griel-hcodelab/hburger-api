import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  async findAll() {
    return this.ingredientsService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Get('/por-tipo/:name')
  async findByTypeName(@Param('name') name: string) {
    return this.ingredientsService.findByTypeName(name)
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ingredientsService.remove(+id);
  }
}
