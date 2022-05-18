import { IsNumberString } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumberString()
  order_id: number;

  products: any;
  quantities?: any;
  aditionOrders: any;
}
