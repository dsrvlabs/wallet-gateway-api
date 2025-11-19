import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { CreateWalletRequestDto } from './dto/create-wallet-request.dto';
import { RequestId } from '../common/decorators/request-id.decorator';
import { RequestIdGuard } from '../common/guards/request-id.guard';
import { RequestIdResponseDto } from '../common/dto/response.dto';

@ApiTags('wallet')
@Controller('v1/wallet')
@UseGuards(RequestIdGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '주소 생성 요청',
    description:
      'HD Wallet 기준 (coin_type, account_id, change) 조합 주소 생성 작업을 큐잉하고, 비동기 처리 상태를 추적합니다.',
  })
  @ApiHeader({
    name: 'x-request-id',
    description: 'Idempotency & Trace를 위한 UUID 형식의 요청 ID',
    required: true,
    example: '7c6ae2d6-3e0a-4a38-9a52-5e8b5b2d1e44',
  })
  @ApiResponse({
    status: 201,
    description: '주소 생성 요청이 성공적으로 생성되었습니다.',
    type: RequestIdResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (x-request-id 헤더 누락 또는 유효하지 않은 형식)',
  })
  async createWalletRequest(
    @RequestId() requestId: string,
    @Body() dto: CreateWalletRequestDto,
  ): Promise<RequestIdResponseDto> {
    await this.walletService.createWalletRequest(requestId, dto);
    return new RequestIdResponseDto(requestId);
  }
}
