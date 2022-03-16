import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  Query,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { checkDate } from 'utils/checkDate';
import { LoginGuard } from './login.guard';
import { Login } from './login.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { checkDocument } from 'utils/checkDocument';
import { checkPhone } from 'utils/checkPhone';
import { checkNumber } from 'utils/checkNumber';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /* Crud do Usuário - Início */

  @Post()
  async create(@Body() body: CreateLoginDto) {
    Object.assign(body, { phone: checkPhone(body.phone) });

    if (body.document) {
      Object.assign(body, { document: checkDocument(body.document) });
    }

    if (body.birthAt) {
      Object.assign(body, { birthAt: checkDate(body.birthAt) });
    }

    if (body.password && body.password.length < 6) {
      throw new BadRequestException(
        'A sua senha é muito curta. Escolha uma senha mais segura.',
      );
    }

    const createdUser = await this.loginService.create(body);
    const token = await this.loginService.getToken(createdUser.user.id);

    const data: object = {};
    Object.assign(data, createdUser.user);
    Object.assign(data, createdUser.person);

    return { data, token };
  }

  @Post('auth')
  login(@Body('email') email: string, @Body('password') password: string) {
    if (!email || !password) {
      throw new BadRequestException('O e-mail ou a senha estão incorretos.');
    }

    return this.loginService.login(email, password);
  }

  @UseGuards(LoginGuard)
  @Get('me')
  findMe(@Login() login) {
    return login;
  }

  @UseGuards(LoginGuard)
  @Patch()
  update(@Login() login, @Body() body: UpdateLoginDto) {
    if (body.phone) {
      Object.assign(body, { phone: checkPhone(body.phone) });
    }

    if (body.document) {
      Object.assign(body, { document: checkDocument(body.document) });
    }

    if (body.birthAt) {
      Object.assign(body, { birthAt: checkDate(body.birthAt) });
    }

    return this.loginService.update(login.id, body);
  }

  @UseGuards(LoginGuard)
  @Patch(':id')
  updateOther(@Param('id') id: string, @Body() body: UpdateLoginDto) {
    if (body.phone) {
      Object.assign(body, { phone: checkPhone(body.phone) });
    }

    if (body.document) {
      Object.assign(body, { document: checkDocument(body.document) });
    }

    if (body.birthAt) {
      Object.assign(body, { birthAt: checkDate(body.birthAt) });
    }

    const userId: number = checkNumber(id);

    return this.loginService.updateOther(userId, body);
  }

  @UseGuards(LoginGuard)
  @Delete('delete/:id')
  remove(@Param('id') user_id: string) {
    const id: number = checkNumber(user_id);

    return this.loginService.remove(id);
  }

  /* Crud do Usuário - Final */

  /* Crud de Fotos do Usuário - Início */

  @UseGuards(LoginGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './storage/photos',
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @Put('photo')
  async setPhoto(@Login() login, @UploadedFile() photo: Express.Multer.File) {
    if (!photo) {
      throw new BadRequestException('Você não escolheu uma foto para enviar.');
    }

    return this.loginService.setPhoto(login.id, photo);
  }

  @UseGuards(LoginGuard)
  @Get('photo')
  async getPhoto(@Login('id') id, @Res({ passthrough: true }) response) {
    const { file, extension } = await this.loginService.getPhoto(id);

    switch (extension) {
      case 'png':
        response.set({ 'Content-Type': 'image/png' });
        break;
      case 'jpg':
        response.set({ 'Content-Type': 'image/jpeg' });
        break;
      case 'webp':
        response.set({ 'Content-Type': 'image/webp' });
        break;
    }

    return new StreamableFile(file);
  }

  @UseGuards(LoginGuard)
  @Delete('photo/delete')
  async removeUserPhoto(@Login('id') user_id) {
    const id: number = checkNumber(user_id);

    this.loginService.removeUserPhoto(id);
  }

  /* Crud de Fotos do Usuário - Final */

  /* Recuperação de senha - Início */

  @UseGuards(LoginGuard)
  @Put('password')
  async changePassword(
    @Body('current_password') currentPassword: string,
    @Body('new_password') newPassword: string,
    @Login('email') email: string,
    @Login('id') id: number,
  ) {
    if (!currentPassword) {
      throw new BadRequestException('Você precisa informar a sua senha atual.');
    }
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException(
        'Você precisa informar uma nova senha válida, com pelo menos seis caracteres.',
      );
    }

    return this.loginService.changePassword({
      currentPassword,
      newPassword,
      email,
      id,
    });
  }

  @Post('forget')
  async forget(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException(
        'Não foi informado nenhum e-mail para recuperação.',
      );
    }

    return this.loginService.recovery(email);
  }

  @Post('reset')
  async reset(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    if (!token) {
      throw new BadRequestException(
        'Não foi possível validar o token informado.',
      );
    }

    if (!password || password.length < 6) {
      throw new BadRequestException(
        'A senha informada é inválida. Informe uma senha com pelo menos seis caracteres.',
      );
    }

    return this.loginService.reset({ token, password });
  }

  /* Recuperação de senha - Final */
}
