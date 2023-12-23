import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('Before ...');

    // const now = Date.now();

    // 성공과 실패에 대해서 분기 처리하는 곳.
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
      })),
    );
  }
}
