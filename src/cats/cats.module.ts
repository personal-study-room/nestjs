import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import { CatsRepository } from './repositories/cats.repository';
import { Cat, CatSchema } from './models/cats.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    forwardRef(() => AuthModule), // 순환참조하고 잇는 모듈간의 해결방법!
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
