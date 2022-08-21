import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { JwtAuthDecorator } from '../../auth/decorators/jwt-auth.decorator';
import { UserDecorator } from './user.decorator';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAll();
  }

  @Get('profile')
  @JwtAuthDecorator()
  getProfile(@UserDecorator('id') id: string) {
    return this.usersService.getById(+id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @JwtAuthDecorator()
  updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.usersService.update(+id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Patch('subscribe/:toUserId')
  @HttpCode(200)
  @JwtAuthDecorator()
  subscribe(
    @UserDecorator('id') fromUserId: number,
    @Param('toUserId') toUserId: number
  ) {
    return this.usersService.subscribe(fromUserId, toUserId);
  }
}
