import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { ReportLogger } from './reportLogger'
import { Observable, tap } from 'rxjs'

export class LogInterceptor implements NestInterceptor {
  constructor(private reportLogger: ReportLogger) {
    this.reportLogger.setContext('LogInterceptor')
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp()
    const request = http.getRequest()

    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        this.reportLogger.log(
          `${request.method} ${request.url} ${Date.now() - now}ms`
        )
      })
    )
  }
}
