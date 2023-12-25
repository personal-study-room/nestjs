import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CatsRepository } from '../repositories/cats.repository';
import { CatRequestDto } from '../models/dto/cats.request.dto';
import { Cat } from '../models/cats.schema';
import { ReadOnlyData } from '../models/dto/cats.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create(email, name, hashedPassword);

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(cat.id, fileName);

    console.log(newCat);
    return newCat;
  }

  async getAllCats(): Promise<ReadOnlyData[]> {
    const cats: Cat[] = await this.catsRepository.getAllCats();
    return cats.map(cat => cat.readOnlyData);
  }

  hiCatService() {
    return 'test';
  }
}
