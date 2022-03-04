import { BadRequestException } from "@nestjs/common";

export function checkPhone(phone: string)
{

    if (phone.length < 10 || phone.length > 11) {
        throw new BadRequestException("Insira um telefone válido, com o DDD no formato XX XXXXX-XXXX.");
    }

    return phone;
}