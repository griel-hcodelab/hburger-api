import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty({
    message: "A rua é obrigatória."
  })
  @IsString()
  street: string;

  number: string;

  complement: string;

  @IsNotEmpty({
    message: "O bairro é obrigatório."
  })
  @IsString()
  district: string;

  @IsNotEmpty({
    message: "a cidade é obrigatória."
  })
  @IsString()
  city: string;

  @IsNotEmpty({
    message: "O estado é obrigatório."
  })
  @IsString()
  state: string;

  @IsNotEmpty({
    message: "O país é obrigatório."
  })
  @IsString()
  country: string;

  @IsNotEmpty({
    message: "O cep é obrigatório."
  })
  @IsString()
  @MaxLength(8)
  zipcode: string;

}