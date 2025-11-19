import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorDetailDto {
  @ApiProperty({
    description: '에러 코드',
    example: 400,
  })
  code: number;

  @ApiProperty({
    description: '에러 메시지',
    example: 'x-request-id header is required',
  })
  message: string;
}

export class ApiResponseDto<T = any> {
  @ApiProperty({
    description: '헤더에서 받은 x-request-id 값을 그대로 반환',
    example: '7c6ae2d6-3e0a-4a38-9a52-5e8b5b2d1e44',
  })
  requestId: string;

  @ApiProperty({
    description: '성공 여부',
    example: true,
  })
  success: boolean;

  @ApiPropertyOptional({
    description: '응답 데이터 (성공 시)',
    example: { requestId: '7c6ae2d6-3e0a-4a38-9a52-5e8b5b2d1e44' },
  })
  data: T | null;

  @ApiPropertyOptional({
    description: '에러 정보 (실패 시)',
    type: ErrorDetailDto,
  })
  error: ErrorDetailDto | null;

  constructor(
    requestId: string,
    success: boolean,
    data: T | null = null,
    error: ErrorDetailDto | null = null,
  ) {
    this.requestId = requestId;
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
