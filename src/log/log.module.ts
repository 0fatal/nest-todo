import { Module } from '@nestjs/common'
import { ReportLogger } from './reportLogger'

@Module({
  providers: [ReportLogger],
  exports: [ReportLogger],
})
export class LogModule {}
