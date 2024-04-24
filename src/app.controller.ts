import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { appDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('text-to-image')
  textToImage(@Body() dto: appDto) {
    return this.appService.textToImage(dto);
  }

  @Post('image-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, //5MB
      },
      storage: memoryStorage(),
    }),
  )
  imageToText(@UploadedFile() file: Express.Multer.File) {
    return this.appService.imageToText(file);
  }
}
