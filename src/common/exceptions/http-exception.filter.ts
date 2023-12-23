import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    console.log('error occurs...');

    if (typeof message === 'string') {
      response //
        .status(status) //
        .json({
          success: false,
          message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...message,
      });
    }
  }
}
