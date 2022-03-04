import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;


  photo: string;

  birthAt: string;


  document: string;


  phone: string;

  user_id: number;
}
