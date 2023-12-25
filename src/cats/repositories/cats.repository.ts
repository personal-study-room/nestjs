import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cat } from '../models/cats.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result !== null;
  }

  async create(email: string, name: string, password: string): Promise<Cat> {
    return await this.catModel.create({
      email,
      name,
      password,
    });
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }

  async findCatByIdWithoutPassword(id: string): Promise<Cat | null> {
    const cat = this.catModel.findById(id).select('-password'); // 'email name' 이라고 쓰면, 저 두개의 필드만 가지고 온다.
    return cat;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    await this.catModel.findByIdAndUpdate(
      { _id: id },
      {
        imgUrl: fileName,
      },
    );
  }

  async getAllCats(): Promise<Cat[]> {
    return await this.catModel.find({});
  }
}
