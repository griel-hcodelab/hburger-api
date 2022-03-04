import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { parse } from 'date-fns';

@Controller('login')
export class LoginController {
	constructor(private readonly loginService: LoginService) { }

	checkDate(date: string)
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

		console.log(parse(date, 'yyyy-MM-dd', new Date()))
	}

	@Post()
	create(@Body() body: CreateLoginDto) {

		// if (body.birthAt) {
        //     const birthAt = parse(body.birthAt, 'yyyy-MM-dd', new Date());
		// 	Object.assign(body, {birthAt})

		// 	console.log({birthAt})

		// 	if (birthAt instanceof Date) {
		// 		console.log('é instancia')
		// 	}

        // }

		if (body.birthAt) {
			this.checkDate(body.birthAt)
		}


		//return this.loginService.create(body);
		
	}

	@Post('auth')
	login(@Body('email') email: string, @Body('password') password: string)
	{

	}

	@Get()
	findAll() {
		return this.loginService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.loginService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
		return this.loginService.update(+id, updateLoginDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.loginService.remove(+id);
	}
}
