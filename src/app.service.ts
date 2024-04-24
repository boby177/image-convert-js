import { Injectable } from '@nestjs/common';
import { appDto } from './app.dto';

@Injectable()
export class AppService {
  async textToImage(dto: appDto) {
    try {
      const textToImage = require('text-to-image');
      const response = await textToImage.generate(dto.text, {
        debug: true,
        fontSize: 50,
        fontFamily: 'Helvetica',
        textColor: 'red',
        maxWidth: 580,
        lineHeight: 80,
        bgColor: 'white',
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async imageToText(file: Express.Multer.File) {
    try {
      const tesseract = require('tesseract.js');

      if (file === null || file === undefined) {
        throw new Error(`Image upload failed, file must not be empty`);
      }

      const response = await tesseract.recognize(file.buffer, 'eng', {
        logger: (e) => console.log(e),
      });

      return response.data.text;
    } catch (error) {
      console.error(error);
    }
  }
}
