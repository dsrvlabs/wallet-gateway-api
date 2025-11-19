import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { RequestId } from '../common/decorators/request-id.decorator';
import { RequestIdGuard } from '../common/guards/request-id.guard';
import { RequestIdResponseDto } from '../common/dto/response.dto';

@ApiTags('withdrawal')
@Controller('v1/withdrawal')
@UseGuards(RequestIdGuard)
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '출금 요청',
    description: '출금(transfer) 요청을 생성하고 상태를 추적합니다.',
  })
  @ApiHeader({
    name: 'x-request-id',
    description: 'Idempotency & Trace를 위한 UUID 형식의 요청 ID',
    required: true,
    example: '7c6ae2d6-3e0a-4a38-9a52-5e8b5b2d1e44',
  })
  @ApiResponse({
    status: 201,
    description: '출금 요청이 성공적으로 생성되었습니다.',
    type: RequestIdResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (x-request-id 헤더 누락 또는 유효하지 않은 형식)',
  })
  async createWithdrawalRequest(
    @RequestId() requestId: string,
    @Body() dto: CreateWithdrawalRequestDto,
  ): Promise<RequestIdResponseDto> {
    await this.withdrawalService.createWithdrawalRequest(requestId, dto);
    return new RequestIdResponseDto(requestId);
  }
}
