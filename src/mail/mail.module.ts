import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { resolve } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.EMAIL_HOST,
          port: Number(process.env.EMAIL_PORT),
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: `HBurger <${process.env.MAIL_FROM}>`,
        },
        template: {
          dir: resolve(__dirname, '../mail/templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
