import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'email@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '나마에와 이름',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '비밀번호 입력',
    example: '12341234',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'data:image/jpeg;base64,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',
  }) // required: false => default
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string; imgUrl: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// 프로토타입 기반의 객체에 새로운 메서드를 추가하도록 내부적으로 설계가 되어 있다.
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
