import { ConsoleLogger } from '@nestjs/common'

export class ReportLogger extends ConsoleLogger {
  verbose(message: string) {
    console.log('【Verbose】日志上报', message)
  }

  log(message: any, ...optionalParams) {
    console.log('【Log】日志上报', message)
    super.log(message, ...optionalParams)
  }

  error(message: any, ...optionalParams) {
    super.error(message, ...optionalParams)
  }

  warn(message: any, ...optionalParams) {
    super.warn(message, ...optionalParams)
  }

  debug(message: any, ...optionalParams) {
    super.debug(message, ...optionalParams)
  }
}
