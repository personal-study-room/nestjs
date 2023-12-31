// 무조건 양의 정수로 parsing해주는 pipe 만들기
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// Injectable()을 사용했음에도, 별도로 모듈에 등록하지 않는 이유는, 결과적으로 사용되는 곳에서 인스턴스화 되기 때문임
@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    // 여기서 데이터를 변환할 수 있다는 것이다.
    console.log('metadata : ', metadata); // { metatype: [Function: Number], type: 'param', data: 'id' }
    console.log('value : ', value); // value : 2
    const result: string = String(value); // 여기서 데이터 형 변환이 발생한다.
    return result;
  }
}
