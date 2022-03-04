import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { checkDate } from 'utils/checkDate';
import * as bcrypt from 'bcrypt';


@Controller('login')
export class LoginController {
	constructor(private readonly loginService: LoginService) { }

	

	@Post()
	create(@Body() body: CreateLoginDto) {

		if (body.birthAt) {
			Object.assign(body, {birthAt:checkDate(body.birthAt)})
		}

		if (body.password && body.password.length < 6) {
			throw new BadRequestException("A sua senha é muito curta. Escolha uma senha mais segura.");
		}

		Object.assign(body, {password:bcrypt.hashSync(body.password, 10)});

		return this.loginService.create(body);
		
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
