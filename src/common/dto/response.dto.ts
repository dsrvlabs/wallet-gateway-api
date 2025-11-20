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
    description: '성공 여부',
    example: true,
  })
  success: boolean;

  @ApiPropertyOptional({
    description: '응답 데이터 (성공 시)',
    example: { id: 1 },
  })
  data: T | null;

  @ApiPropertyOptional({
    description: '에러 정보 (실패 시)',
    type: ErrorDetailDto,
  })
  error: ErrorDetailDto | null;

  constructor(success: boolean, data: T | null = null, error: ErrorDetailDto | null = null) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
