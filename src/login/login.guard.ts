import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authorization = req.headers['authorization'];

      const token = authorization.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException(
          'Não é possível validar o seu token de acesso.',
        );
      }

      req.auth = await this.loginService.decodeToken(token);

      req.user = await this.loginService.getById(req.auth.id);
    } catch (e) {
      return false;
    }

    return true;
  }
}
