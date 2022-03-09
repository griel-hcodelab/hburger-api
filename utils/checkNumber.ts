import { BadRequestException } from "@nestjs/common";

export function checkNumber(number:any, message:string = ''):number
{

    let error:string = "Este código ou ID é incorreto. Por favor, forneça o código correto.";

    if (message) {
        error = message;
    }

    if (!number) {
        throw new BadRequestException("Por favor, informe o valor correspondente ao campo.");
    }

    number = Number(number);

    if (isNaN(number)) {
        throw new BadRequestException(error);
    }

    return number;

}