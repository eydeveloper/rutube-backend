import { IsString } from 'class-validator';

export class VideoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  isPublic?: boolean;

  @IsString()
  videoPath: string;

  @IsString()
  thumbnailPath: string;
}
