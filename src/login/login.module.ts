import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		PrismaModule,
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: process.env.JWT_SECRET,
				signOptions: {
					expiresIn: Number(process.env.JWT_EXPIRE),
				},
			}),
		}),
	],
	controllers: [LoginController],
	providers: [LoginService],
	exports: [LoginService]
})
export class LoginModule { }
