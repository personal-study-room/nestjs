import { Body, Controller, Get, Post, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from '../models/cats.schema';
import { ReadOnlyData } from '../models/dto/cats.dto';
import { CatRequestDto } from '../models/dto/cats.request.dto';
import { CatsService } from '../services/cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
// @UseFilters()는 클래스 레벨에서 사용 가능하다.
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}
  @ApiOperation({ summary: '특정 고양이 가져오기 api' })
  @UseGuards(JwtAuthGuard) // express 에서 미들웨어 등록하는 것처럼 이렇게 가드를 등록해준다.
  @Get()
  // getCurrentCat(@Req() req: Request) {
  getCurrentCat(@CurrentUser() cat: Cat) {
    console.log(cat.readOnlyData);

    return cat.readOnlyData;
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
  async signup(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인 api' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '로그아웃 api' })
  @Post('logout')
  logOut() {
    return '';
  }

  // multipart-form data 요청이 들어온다
  @ApiOperation({ summary: '파일 업로드 api' })
  @UseInterceptors(FilesInterceptor('file', 10, multerOptions('cats'))) // form 태그 이름.
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  async uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
    console.log(files);
    // return { image: `http://localhost:3000/media/cats/${files[0].filename}` };
    return await this.catsService.uploadImg(cat, files);
  }

  @Get('all')
  async getAllCats() {
    return await this.catsService.getAllCats();
  }
}
