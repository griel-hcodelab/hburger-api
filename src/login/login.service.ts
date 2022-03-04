import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {

	constructor(private db: PrismaService, private jwt: JwtService) {}

	async getToken(userId: number) {
        const { email, id, Person } = await this.getById(userId);

		const { name, photo } = Person[0];

        return this.jwt.sign({ id, email, name, photo });
    }

	async getById(userId: number)
	{
		const id = Number(userId);

		if (isNaN(id)) {
			throw new BadRequestException("Este ID de usuário é inválido")
		}

		return this.db.user.findFirst({
			where: {
				id
			},
			include: {
				Person: true
			}
		});
	}

	async getByEmail(email:string)
	{
		if (!email) {
			throw new BadRequestException("O e-mail é obrigatório");
		}

		return this.db.user.findFirst({
			where: {
				email
			}
		});
	}

	async checkPassword(id: number, password: string)
	{
		if (!password) {
			throw new UnauthorizedException("O e-mail ou senha estão incorretos.");
		}

		const user = await this.db.user.findUnique({
			where: {
				id
			}
		});

		const checked = await bcrypt.compare(password, user.password);

		if (!checked) {
			throw new UnauthorizedException("O e-mail ou senha estão incorretos.");
		}

		return checked;


	}

	async create({ email, password, name, birthAt, document, phone }: CreateLoginDto) {

		if (document.length < 11) {
			throw new BadRequestException("Insira um documento válido");
		}

		if (await this.getByEmail(email)) {
			throw new BadRequestException("Este e-mail já está cadastrado")
		}

		const user = await this.db.user.create({
			data: {
				email,
				password
			}
		});

		const person = await this.db.person.create({
			data: {
				user_id: user.id,
				name,
				birthAt,
				document,
				phone
				
			}
		});

		delete user.password;
		delete person.user_id;

		return {user, person};

	}

	async login(email: string, password: string)
	{

		const user = await this.getByEmail(email);

		if (!user) {
			throw new UnauthorizedException("O e-mail ou senha estão incorretos.");
		}

		await this.checkPassword(user.id, password);

		const token = await this.getToken(user.id);

		return {token};

	}

	findAll() {
		return `This action returns all login`;
	}

	findOne(id: number) {
		return `This action returns a #${id} login`;
	}

	update(id: number, updateLoginDto: UpdateLoginDto) {
		return `This action updates a #${id} login`;
	}

	remove(id: number) {
		return `This action removes a #${id} login`;
	}
}
