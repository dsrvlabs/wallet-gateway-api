import { ApiProperty } from '@nestjs/swagger';

export class RequestIdResponseDto {
  @ApiProperty({
    description: '헤더에서 받은 x-request-id 값을 그대로 반환',
    example: '7c6ae2d6-3e0a-4a38-9a52-5e8b5b2d1e44',
  })
  requestId: string;

  constructor(requestId: string) {
    this.requestId = requestId;
  }
}
