import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const welcome = () => {
	console.log(`\n ╔══════════════════════════════════════════════════════╗\n ║                                                      ║\n ║ Seja muito bem-vindo à API HBurger do Time Vermelho! ║\n ║                                                      ║\n ╚══════════════════════════════════════════════════════╝`);
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
    cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
  });

	const config = new DocumentBuilder()
    .setTitle('Hburguer Backend')
    .setDescription('Fast food API')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);

	welcome();
}
bootstrap();
