import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({
        message: "O valor total do pedido precisa ser informado"
    })
    @IsNumberString()
    total: number;

    @IsString()
    observations?: string;

    @IsNumberString()
    address_id: number;

    @IsNumberString()
    payment_situation_id: number;

    product_id: string;

    quantity: string;
}
