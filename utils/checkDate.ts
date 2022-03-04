import { BadRequestException } from '@nestjs/common';
import { parse } from 'date-fns';

export function checkDate(date: string)
	{
		const splited = date.split('-')
		
		for (let i = 0; i < splited.length; i++) {

			if (splited[0] < '1900' || splited[0] > new Date().getFullYear().toString()) {
				throw new BadRequestException("O ano de nascimento é inválido")
			}

			if (splited[1] < '1' || splited[1] > '12') {
				throw new BadRequestException("O mês de nascimento é inválido")
			}

			if (splited[2] < '1' || splited[2] > '31') {
				throw new BadRequestException("O dia de nascimento é inválido")
			}

			const n = Number(splited[i]);

			if (isNaN(n)) {
				throw new BadRequestException("Esta data de nascimento é inválida")
			}
		}

		return parse(date, 'yyyy-MM-dd', new Date())
	}