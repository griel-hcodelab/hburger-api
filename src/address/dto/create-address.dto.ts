import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto {
  street: string;

  number: string;

  complement: string;

  district: string;

  city: string;

  state: string;

  country: string;

  @IsNotEmpty({
    message: 'O cep é obrigatório.',
  })
  @IsString()
  @MaxLength(8)
  zipcode: string;
}
