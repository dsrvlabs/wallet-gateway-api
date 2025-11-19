import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/response.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['x-request-id'] as string;

    return next.handle().pipe(
      map((data) => {
        // 이미 ApiResponseDto 형식이면 그대로 반환
        if (data instanceof ApiResponseDto) {
          return data;
        }

        // 기존 응답을 통일된 형식으로 변환
        return new ApiResponseDto(requestId, true, data, null);
      }),
    );
  }
}
