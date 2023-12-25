import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // jwtStrategy를 에플리케이션의 모듈에 등록
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // 해당 모듈을 import 하면, jwtService를 가지고 온다.
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatsModule), // 모듈 자체를 임포트하면, 해당 모듈의 export 된 것들을 사용할 수 있다.
  ],
  providers: [AuthService, JwtStrategy], // 여기까지는 프라이빗 provider가 됨
  exports: [AuthService], // export 하는 순간 public으로 변경됨
})
export class AuthModule {}
