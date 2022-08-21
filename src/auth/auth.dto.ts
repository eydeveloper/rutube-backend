import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
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

  @IsNotEmpty({
    message: 'Обязательное поле'
  })
  @MinLength(6, {
    message: 'Пароль не может быть короче 6 символов'
  })
  @IsString({
    message: 'Разрешены только буквы, цифры и общие символы пунктуации'
  })
  password: string;
}
