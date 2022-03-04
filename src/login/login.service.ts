import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginService {

	constructor(private db: PrismaService) {}

	async create({ email, password }: CreateLoginDto) {

		const user = await this.db.user.create({
			data: {
				email,
				password
			}
		});

		console.log(user)

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
