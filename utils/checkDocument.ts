import { BadRequestException } from "@nestjs/common";

export function checkDocument(document: string)
{

    if (document.length < 11 || document.length > 11) {
        throw new BadRequestException("Insira um documento CPF válido");
    }

    return document;
}