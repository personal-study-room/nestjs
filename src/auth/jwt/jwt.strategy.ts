import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 여기는 jwt를 decoding 한 후 저장하는 전략
  constructor(private readonly catsRepository: CatsRepository) {
    console.log('jwt Strategy 실행');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(payload.sub);
    console.log('validate method: 실행');
    if (!cat) {
      throw new UnauthorizedException();
    }

    return cat; // request.user 안에 cat 이 들어간다?
  }
}
