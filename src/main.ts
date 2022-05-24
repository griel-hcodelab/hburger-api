import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const welcome = () => {
  console.log(
    `\n ╔══════════════════════════════════════════════════════╗\n ║                                                      ║\n ║ Seja muito bem-vindo à API HBurger do Time Vermelho! ║\n ║                                                      ║\n ╚══════════════════════════════════════════════════════╝`,
  );
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });

  await app.listen(3000);

  welcome();
}
bootstrap();
