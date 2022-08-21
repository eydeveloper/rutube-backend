import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { IMediaResponse } from './media.interface';

@Injectable()
export class MediaService {
  async upload(
    file: Express.Multer.File,
    folder = 'videos'
  ): Promise<IMediaResponse> {
    const uploadFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

    return {
      url: `/uploads/${folder}/${file.originalname}`,
      name: file.originalname
    };
  }
}
