import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {
    //Essa linha permite o envio de e-mail sem o protocolo SSL.
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  async send({
    to,
    subject,
    template,
    data,
  }: {
    to: string;
    subject: string;
    template: string;
    data: any;
  }) {
    return this.mailerService.sendMail({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      template,
      context: data,
    });
  }
}
