import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';

import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
// @UseFilters()는 클래스 레벨에서 사용 가능하다.
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  // @UseFilters(HttpExceptionFilter) // 커스텀 필터를 적용한 예시.
  getAllCats() {
    /** 
    // express 에서 new Error() 와 같다.
    throw new HttpException('api is broken', 401);

    // custom
    throw new HttpException(
      // json 형태 정의
      { status: HttpStatus.FORBIDDEN, //////: 'this is a custom message' },
      // status code 전달
      HttpStatus.FORBIDDEN,
    );
    */
    // throw new HttpException('api broken', 401);

    return { cats: 'all cats' };
  }

  //  /cats/:id
  @Get(':id')
  // pipe는 각각의 단계를 task라고 하며, 내가 나열한 pipe를 토대로 순서대로 실행한다.
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log('controller');
    console.log('param : ', param);
    console.log(typeof param);

    return 'one cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'partially update cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
