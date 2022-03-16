import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentSituationDto {
  @IsString({ message: 'Nome deve ser string válida.' })
  @IsNotEmpty({ message: 'Nome deve ser informado.' })
  name: string;
}
