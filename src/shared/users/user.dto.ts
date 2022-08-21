import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({
    message: 'Обязательное поле'
  })
  @IsEmail(
    {},
    {
      message: 'Недействительный адрес электронной почты'
    }
  )
  email: string;

  password?: string;

  username?: string;

  description?: string;

  avatarPath?: string;
}
