import { IsString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWalletRequestDto {
  @ApiPropertyOptional({
    description: '조직 식별자',
    example: 'KqQjPXZna31P4mhQ',
  })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiProperty({
    description: 'SLIP-0044 (예: 60=EVM, 0=BTC, 501=Sol)',
    example: 60,
  })
  @IsInt()
  coinType: number;

  @ApiProperty({
    description: 'BIP44 account (일반적으로 사용자/계정 단위)',
    example: 0,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  accountId: number;

  @ApiPropertyOptional({
    description: 'BIP44 change (기본 0: deposit)',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  change?: number;
}
