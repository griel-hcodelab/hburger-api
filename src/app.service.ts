import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Seja bem-vindo à API do Projeto Hburger.';
  }
}
