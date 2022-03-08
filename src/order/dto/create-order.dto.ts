import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({
        message: "O valor total do pedido precisa ser informado"
    })
    @IsNumberString()
    total: number;

    @IsString()
    observations?: string;

    addressId: string;
}
