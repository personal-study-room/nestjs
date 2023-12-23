import { Body, Controller, Get, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ReadOnlyData } from './dto/cats.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
// @UseFilters()는 클래스 레벨에서 사용 가능하다.
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @ApiOperation({ summary: '특정 고양이 가져오기 api' })
  @Get()
  getCurrentCat() {
    return '';
  }

  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: ReadOnlyData,
  })
  @ApiUnauthorizedResponse({
    description: '이미 존재하는 회원',
  })
  @ApiOperation({ summary: '회원가입 api' })
  @Post()
  @UseFilters(HttpExceptionFilter)
  async signup(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인 api' })
  @Post('login')
  logIn() {
    return '';
  }

  @ApiOperation({ summary: '로그아웃 api' })
  @Post('logout')
  logOut() {
    return '';
  }

  @ApiOperation({ summary: '파일 업로드 api' })
  @Post('upload/cats')
  uploadCatImg() {
    return '';
  }
}
