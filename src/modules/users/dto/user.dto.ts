import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';
export class UserDto {
  id: number;
  name: string;
  @IsEmail()
  email: string;
  @IsMobilePhone("ru-RU")
  @IsOptional()
  phone: string;
  password: string;
  gender: string;
}
