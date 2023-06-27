import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';


@Controller('files')
export class FilesController {
  @Post()
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: '../frontend/public/logos',
      filename: fileNamer,
    }),
  }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File
  ){

    if( !file ){
      throw new BadRequestException(`Make sure that the file is an image`)
    }

    return file.filename;
  }
}
