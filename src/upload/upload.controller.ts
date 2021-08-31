import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'

export const staticBaseUrl = 'http://localhost:3000/api/static/'

@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: staticBaseUrl + file.originalname,
    }
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('files'))
  uploadFiles(@UploadedFile() files: Array<Express.Multer.File>) {
    return {
      files: files.map(f => staticBaseUrl + f.originalname),
    }
  }
}
