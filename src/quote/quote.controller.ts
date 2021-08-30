import { Controller, Get } from '@nestjs/common'
import { SkipJwtAuth } from '../auth/constants'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

const randomQuoteApi = 'http://api.quotable.io/random'

@SkipJwtAuth()
@Controller('quote')
export class QuoteController {
  constructor(private httpService: HttpService) {}

  @Get('random')
  async getRandomQuote() {
    const response$ = this.httpService.get(randomQuoteApi)
    const response = await lastValueFrom(response$)
    return response.data
  }
}
