import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 email 이 있는지,
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요~!');
    }

    // 비밀번호 일치?
    const isPasswordValidated: boolean = await bcrypt.compare(password, cat.password);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요~!');
    }

    //
    const payload = { email, sub: cat.id };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
