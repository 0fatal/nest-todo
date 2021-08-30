import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'reflect-metadata'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './error/http-exception.filter'
import { AllExceptionFilter } from './error/all-exception.filter'
import { TransformInterceptor } from './transform/transform.interceptor'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { LogInterceptor } from './log/log.interceptor'
import { ReportLogger } from './log/reportLogger'

async function bootstrap() {
  const reportLogger = new ReportLogger()

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost:8080'],
      credentials: true,
    },
    bufferLogs: true,
    logger: reportLogger,
  })

  app.useStaticAssets(join(__dirname, '..', 'upload_dist'))

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor()
  )

  await app.listen(3000)
}
bootstrap()
