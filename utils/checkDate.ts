import { BadRequestException } from '@nestjs/common';
import { parse, isValid } from 'date-fns';

export function checkDate(date: string) {
    
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

    if (!isValid(parsedDate)) {
        throw new BadRequestException("Esta data de nascimento está incorreta.");
    } else {
        return parsedDate;
    }

}