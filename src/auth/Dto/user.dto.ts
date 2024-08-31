import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gender: string;

  phone_no: string;

  @IsOptional()
  address: string;

  @IsNumber()
  age: number;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
