import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { Cat } from '../cats.schema';

export class ReadOnlyData extends PickType(Cat, ['email', 'name', 'imgUrl'] as const) {
  @ApiProperty({
    example: '12o39812',
    description: 'id',
  })
  @IsEmail()
  @IsNotEmpty()
  id: string;
}
