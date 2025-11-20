import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ApiResponseDto } from '../dto/response.dto';

@Catch() // 모든 예외를 catch
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      // NestJS HttpException인 경우
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
      message = Array.isArray(message) ? message.join(', ') : message;
    } else if (exception instanceof QueryFailedError) {
      // TypeORM QueryFailedError인 경우
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Database query failed';
    } else if (exception instanceof Error) {
      // 일반 Error인 경우
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
    } else {
      // 알 수 없는 예외
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    // 통일된 에러 응답 형식
    const errorResponse = new ApiResponseDto(false, null, {
      code: status,
      message,
    });

    response.status(status).json(errorResponse);
  }
}
