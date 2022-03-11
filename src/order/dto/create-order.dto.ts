import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    observations?: string;

    @IsNumberString()
    address_id: number;

    @IsNumberString()
    payment_situation_id: number;

    products: string;

    quantities: string;

    aditions_itens: string;
}
