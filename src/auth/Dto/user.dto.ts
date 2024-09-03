import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gender: string;

  @IsOptional()
  phone_no: string;

  @IsOptional()
  profilePic: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
