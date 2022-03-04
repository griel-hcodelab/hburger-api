import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentSituationDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}