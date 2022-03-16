import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderIgredientDto } from './create-order-igredient.dto';

export class UpdateOrderIgredientDto extends PartialType(
  CreateOrderIgredientDto,
) {}
