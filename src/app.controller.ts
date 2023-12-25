import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { CatsService } from './cats/services/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.catsService.hiCatService());

    return this.appService.getHello();
  }
}
