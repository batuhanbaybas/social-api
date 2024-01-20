import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
