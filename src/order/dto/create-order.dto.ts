import { IsNumberString, IsString } from 'class-validator';

export class CreateOrderDto {

  observations?: string;


  address_id?: number;

  products: any;

  quantities?: string;

  aditions_itens: any;
}
