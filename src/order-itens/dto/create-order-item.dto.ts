import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateOrderItemDto {
    @IsNumberString()
    @IsNotEmpty({
        message: "A quantidade do produto precisar ser informada"
    })
    quantity: number;

    @IsNumberString()
    order_id: number;

    @IsNumberString()
    product_id: number;

    @IsString()
    product_name: string;

    @IsNumberString()
    price: number;
}
