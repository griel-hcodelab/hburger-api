import { IsNumberString, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    observations?: string;

    @IsNumberString()
    address_id: number;

    products: string;

    quantities: string;

    aditions_itens: any;
}
