
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientTypesModule } from './ingredient-types/ingredient-types.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { LoginModule } from './login/login.module';
import { PaymentSituationsModule } from './payment-situations/payment-situations.module';


@Module({
  imports: [
    MailModule,
    PrismaModule,
    AddressModule,
    LoginModule,
    PaymentSituationsModule,
    IngredientTypesModule,
    IngredientsModule,
  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
