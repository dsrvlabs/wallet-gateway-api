import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseDto } from '../dto/response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || exception.message;

    // 통일된 에러 응답 형식
    const errorResponse = new ApiResponseDto(
      (request.headers['x-request-id'] as string) || '',
      false,
      null,
      {
        code: status,
        message: Array.isArray(message) ? message.join(', ') : message,
      },
    );

    response.status(status).json(errorResponse);
  }
}
