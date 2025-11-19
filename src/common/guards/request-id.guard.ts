import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';

@Injectable()
export class RequestIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['x-request-id'];

    if (!requestId) {
      throw new BadRequestException('x-request-id header is required');
    }

    // UUID 형식 검증 (선택적)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(requestId)) {
      throw new BadRequestException('x-request-id must be a valid UUID format');
    }

    return true;
  }
}
