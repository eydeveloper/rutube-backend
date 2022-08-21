import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { JwtAuthDecorator } from '../../auth/decorators/jwt-auth.decorator';
import { UserDecorator } from '../users/user.decorator';
import { VideoDto } from './video.dto';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getVideos(@Query('searchTerm') searchTerm?: string) {
    return this.videosService.getAll(searchTerm);
  }

  @Get('most-popular')
  getMostPopularVideos() {
    return this.videosService.getMostPopular();
  }

  @Get(':id')
  getVideo(@Param('id') id: string) {
    return this.videosService.getById(+id);
  }

  @Get('private/:id')
  @JwtAuthDecorator()
  getPrivateVideo(@Param('id') id: string) {
    return this.videosService.getById(+id, false);
  }

  @Post()
  @HttpCode(200)
  @JwtAuthDecorator()
  createVideo(@UserDecorator('id') userId: number) {
    return this.videosService.create(userId);
  }

  @Put(':id')
  @HttpCode(200)
  @JwtAuthDecorator()
  updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
    return this.videosService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @JwtAuthDecorator()
  deleteVideo(@Param('id') id: string) {
    return this.videosService.delete(+id);
  }

  @Patch('update-views/:id')
  @HttpCode(200)
  updateViews(@Param('id') id: string) {
    return this.videosService.updateViews(+id);
  }

  @Patch('update-reaction/:id')
  @HttpCode(200)
  @JwtAuthDecorator()
  updateReaction(@Param('id') id: string) {
    return this.videosService.updateReaction(+id);
  }
}
