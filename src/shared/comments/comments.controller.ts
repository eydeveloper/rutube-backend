import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { JwtAuthDecorator } from '../../auth/decorators/jwt-auth.decorator';
import { UserDecorator } from '../users/user.decorator';
import { CommentDto } from './comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @JwtAuthDecorator()
  createVideo(@UserDecorator('id') id: number, @Body() dto: CommentDto) {
    return this.commentsService.create(id, dto);
  }
}
