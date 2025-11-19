import { Injectable } from '@nestjs/common';
import { LoggerService } from 'nest-logger';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';

export interface WithdrawalRequest {
  requestId: string;
  organizationId: string;
  coinType: number;
  from: string;
  to: string;
  amount: string;
  status: number; // -1: pending
  createdAt: Date;
}

@Injectable()
export class WithdrawalService {
  // 메모리 저장소 (실제로는 DB 또는 큐에 저장)
  private withdrawalRequests: Map<string, WithdrawalRequest> = new Map();

  constructor(private readonly logger: LoggerService) {}

  async createWithdrawalRequest(requestId: string, dto: CreateWithdrawalRequestDto): Promise<void> {
    // Idempotency 체크: 동일한 requestId가 이미 존재하면 중복 요청으로 처리
    if (this.withdrawalRequests.has(requestId)) {
      // 이미 존재하는 요청이면 그대로 반환 (idempotent)
      this.logger.warn(
        `Duplicate withdrawal request detected: ${requestId}`,
        `${this.constructor.name}.${this.createWithdrawalRequest.name}`,
      );
      return;
    }

    // pending 상태로 저장
    const withdrawalRequest: WithdrawalRequest = {
      requestId,
      organizationId: dto.organizationId,
      coinType: dto.coinType,
      from: dto.from,
      to: dto.to,
      amount: dto.amount,
      status: -1, // pending
      createdAt: new Date(),
    };

    this.withdrawalRequests.set(requestId, withdrawalRequest);

    this.logger.log(
      `Withdrawal request created: ${requestId}, coinType: ${dto.coinType}, amount: ${dto.amount}`,
      `${this.constructor.name}.${this.createWithdrawalRequest.name}`,
    );

    // TODO: 실제 오케스트레이터에 전달하는 로직
    // await this.orchestratorService.processWithdrawal(withdrawalRequest);
  }

  getWithdrawalRequest(requestId: string): WithdrawalRequest | undefined {
    return this.withdrawalRequests.get(requestId);
  }
}
