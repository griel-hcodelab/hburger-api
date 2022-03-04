import { BadRequestException } from "@nestjs/common";

export function checkNumber(number:any):number
{

    if (!number) {
        throw new BadRequestException("Por favor, informe o código ou o ID.");
    }

    number = Number(number);

    if (isNaN(number)) {
        throw new BadRequestException("Este código ou ID é incorreto. Por favor, forneça o código correto.");
    }

    return number;

}