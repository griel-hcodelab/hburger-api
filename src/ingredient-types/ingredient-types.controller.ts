import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IngredientTypesService } from './ingredient-types.service';
import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';
import { LoginGuard } from '../login/login.guard';

@Controller('ingredients/types')
export class IngredientTypesController {
  constructor(
    private readonly ingredientTypesService: IngredientTypesService,
  ) {}

  @UseGuards(LoginGuard)
  @Post()
  async create(@Body() data: CreateIngredientTypeDto) {
    return this.ingredientTypesService.create(data);
  }

  @Get()
  async findAll() {
    return this.ingredientTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientTypesService.findOne(+id);
  }

  @UseGuards(LoginGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientTypeDto: UpdateIngredientTypeDto,
  ) {
    return this.ingredientTypesService.update(+id, updateIngredientTypeDto);
  }

  @UseGuards(LoginGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientTypesService.remove(+id);
  }
}
