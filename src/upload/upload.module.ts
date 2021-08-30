import { Module } from '@nestjs/common'
import { UploadController } from './upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import { UploadService } from './upload.service'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '../../upload_dist'),
        filename(req, file, cb) {
          cb(null, file.originalname)
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
