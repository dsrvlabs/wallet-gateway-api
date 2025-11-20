import { IsString, IsInt, IsNotEmpty, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawalRequestDto {
  @ApiProperty({
    description: '조직 식별자',
    example: '0b9f4c27-74a2-4dc4-9b47-3e2a1c8a7f51',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    description: 'SLIP-0044 (60=EVM 등)',
    example: 60,
  })
  @IsInt()
  coinType: number;

  @ApiProperty({
    description: '송신 주소',
    example: '0x1111111111111111111111111111111111111111',
  })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    description: '수신 주소',
    example: '0x2222222222222222222222222222222222222222',
  })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: '체인 네이티브 단위 금액 (NUMERIC(38,18) 한도)',
    example: '0.125',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    // string 또는 number를 string으로 변환
    return typeof value === 'number' ? value.toString() : value;
  })
  @Matches(/^\d+(\.\d+)?$/, {
    message: 'amount must be a valid number string',
  })
  amount: string;
}
