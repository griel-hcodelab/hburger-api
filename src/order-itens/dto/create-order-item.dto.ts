import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty({
        message: "O nome do produto é obrigatório"
    })
    product_name: string;

    @IsNumberString()
    @IsNotEmpty({
        message: "O preço precisa ser informado"
    })
    price: number;

    @IsNumberString()
    @IsNotEmpty({
        message: "A quantidade do produto precisar ser informada"
    })
    quantity: number;
}
