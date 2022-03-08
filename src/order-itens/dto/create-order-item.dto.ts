import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateOrderItemDto {
    @IsNumberString()
    @IsNotEmpty({
        message: "A quantidade do produto precisar ser informada"
    })
    quantity: number;
}
