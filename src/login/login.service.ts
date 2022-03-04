import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { parse } from 'date-fns';
import { JwtService } from '@nestjs/jwt';

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
