import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { join } from 'path';
import { createReadStream, existsSync, renameSync, unlinkSync } from 'fs';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class LoginService {


	constructor(private db: PrismaService, private jwt: JwtService, private mail: MailService) { }

	/* Métodos de apoio - Início */

	async getToken(user_id: number)
	{
		const { email, id, Person } = await this.getById(user_id);

		const { name, photo } = Person[0];

		return this.jwt.sign({ id, email, name, photo });
	}

	async decodeToken(token: string)
	{
		try {
			await this.jwt.verify(token);
		} catch (e) {
			throw new UnauthorizedException(e.message);
		}

		return this.jwt.decode(token);
	}

	async getById(user_id: number)
	{
		if (!user_id) {
			throw new UnauthorizedException('Este ID de usuário é inválido');
		}

		const id = Number(user_id);

		if (isNaN(id)) {
			throw new BadRequestException('Este ID de usuário é inválido');
		}

		const user = await this.db.user.findFirst({
			where: {
				id,
			},
			include: {
				Person: true,
			},
		});

		delete user.password;

		return user;
	}

	async getByEmail(email:string)
	{

		if (!email) {
			throw new BadRequestException("O e-mail é obrigatório");
		}

		const user = await this.db.user.findFirst({
			where: {
				email
			},
			include: {
				Person: true
			}
		});

		if (user) {
			delete user.password;
			return user;
		}

	}

	async getPersonId(user_id: number)
	{
		const person = await this.db.person.findFirst({
			where: {
				user_id,
			},
		});

		return Number(person.id);
	}

	async checkPassword(id: number, password: string)
	{
		if (!password) {
			throw new UnauthorizedException('O e-mail ou senha estão incorretos.');
		}

		const user = await this.db.user.findUnique({
			where: {
				id,
			},
		});

		const checked = await bcrypt.compare(password, user.password);

		if (!checked) {
			throw new UnauthorizedException('O e-mail ou senha estão incorretos.');
		}

		return checked;
	}

	/* Métodos de apoio - Final */

	/* Crud do Usuário - Início */

	async create({email, password, name, birthAt, document, phone, }: CreateLoginDto)
	{

		if (await this.getByEmail(email)) {
			throw new BadRequestException('Este e-mail já está cadastrado');
		}

		const user = await this.db.user.create({
			data: {
				email,
				password: bcrypt.hashSync(password, 10),
			},
		});

		const person = await this.db.person.create({
			data: {
				user_id: user.id,
				name,
				birthAt,
				document,
				phone,
			},
		});

		delete user.password;
		delete person.user_id;

		return { user, person };
	}

	async login(email: string, password: string)
	{
		const user = await this.getByEmail(email);

		if (!user) {
			throw new UnauthorizedException('O e-mail ou senha estão incorretos.');
		}

		await this.checkPassword(user.id, password);

		const token = await this.getToken(user.id);

		return { token };
	}

	async update(id: number, data: UpdateLoginDto)
	{
		const person = await this.db.person.findFirst({
			where: {
				user_id: id,
			},
		});

		const updated = await this.db.person.update({
			where: {
				id: person.id,
			},
			data,
		});

		return updated;
	}

	async updateOther(id: number, data: UpdateLoginDto)
	{
		const person = await this.db.person.findFirst({
			where: {
				user_id: id,
			},
		});

		const updated = await this.db.person.update({
			where: {
				id: person.id,
			},
			data,
		});

		return updated;
	}

	async remove(id: number)
	{
		const user = await this.db.user.delete({
			where: {
				id,
			},
		});

		delete user.password;

		return user;
	}

	/* Crud do Usuário - Final */

	/* Crud de Fotos do Usuário - Início */

	getStoragePhoto(photo: string)
	{

		if (!photo) {
			throw new BadRequestException('O nome do arquivo é obrigatório.');
		}

		return join(__dirname, '../', '../', '../', 'storage', 'photos', photo);
	}

	async removeUserPhoto(user_id: number)
	{
		const id = await this.getPersonId(user_id);

		const { photo } = await this.db.person.findFirst({
			where: {
				id,
			},
		});

		if (photo) {
			const currentPhoto = this.getStoragePhoto(photo);

			if (existsSync(currentPhoto)) {
				unlinkSync(currentPhoto);
			}
		}

		return this.update(user_id, {
			photo: null,
		});
	}

	async setPhoto(id: number, file: Express.Multer.File)
	{
		if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
			throw new BadRequestException('Invalid file type.');
		}

		let extension = '';

		switch (file.mimetype) {
			case 'image/png':
				extension = 'png';
				break;
			case 'image/webp':
				extension = 'webp';
				break;

			default:
				extension = 'jpg';
		}

		const photo = `${Date.now()}-${file.filename}.${extension}`;

		const from = this.getStoragePhoto(file.filename);
		const to = this.getStoragePhoto(photo);

		renameSync(from, to);

		await this.removeUserPhoto(id);

		await this.db.person.update({
			where: {
				id: await this.getPersonId(id),
			},
			data: {
				photo,
			},
		});
	}

	async getPhoto(user_id: number)
	{
		
		const id = await this.getPersonId(user_id);

		const { photo } = await this.db.person.findFirst({
			where: {
				id,
			},
		});

		let filePath = this.getStoragePhoto('../no-photo.webp');

		if (photo) {
			filePath = this.getStoragePhoto(photo);
		}

		const file = createReadStream(filePath);

		const extension = filePath.split('.').pop();

		return {
			file,
			extension,
		};
	}

	/* Crud de Fotos do Usuário - Fim */

	/* Recuperação de senha - Início */

	async changePassword(data)
	{
		const result = await this.checkPassword(data.id, data.currentPassword);

		if (result) {
			const updated = await this.db.user.update({
				where: {
					id: data.id,
				},
				data: {
					password: bcrypt.hashSync(data.newPassword, 10),
				},
			});

			delete updated.password;

			return updated;
		}
	}

	async recovery(email: string) {
		const { id, Person } = await this.getByEmail(email);

		const { name } = Person[0];

		if (id) {
			const token = await this.jwt.sign(
				{ id },
				{
					expiresIn: '1hr',
				},
			);

			await this.db.passwordRecovery.create({
				data: {
					token,
					user_id: +id,
				},
			});

			await this.mail.send({
				to: email,
				subject: 'Recuperação de senha - HBurger',
				template: 'forget',
				data: {
					name,
					token,
					url: `https://www.hburger.com/login/reset?token=${token}`,
				},
			});
		}

		return {
			message: `Se ${email} existir em nossa base de dados, será enviado um e-mail com as instruções para mudar a sua senha. As instruções expiram em uma hora.`,
		};
	}

	async reset(data)
	{


		const token = await this.decodeToken(data.token);

		const id = JSON.parse(JSON.stringify(token)).id;


		const resetCheck = await this.db.passwordRecovery.findFirst({
			where: {
				token: data.token,
				resetAt: null
			}
		});

		if (!resetCheck) {
			throw new BadRequestException("Esta recuperação de senha já foi utilizada. Se você esqueceu sua senha, faça uma nova solicitação.");
		}

		await this.db.passwordRecovery.updateMany({
			where: {
				token: {
					equals: data.token
				},
				user_id: {
					equals: id
				}
			},
			data: {
				resetAt: new Date()
			}
		});

		const user = await this.db.user.update({
			where: {
				id
			},
			data: {
				password: bcrypt.hashSync(data.password, 10),
			}
		});

		return user;

	}

	/* Recuperação de senha - Final */
}
