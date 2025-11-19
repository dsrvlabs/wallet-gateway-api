import { Injectable } from '@nestjs/common';
import { LoggerService } from 'nest-logger';
import { CreateWalletRequestDto } from './dto/create-wallet-request.dto';

export interface WalletRequest {
  requestId: string;
  organizationId?: string;
  coinType: number;
  accountId: number;
  change: number;
  status: number; // -1: pending
  createdAt: Date;
}

@Injectable()
export class WalletService {
  // 메모리 저장소 (실제로는 DB 또는 큐에 저장)
  private walletRequests: Map<string, WalletRequest> = new Map();

  constructor(private readonly logger: LoggerService) {}

  async createWalletRequest(requestId: string, dto: CreateWalletRequestDto): Promise<void> {
    // Idempotency 체크: 동일한 requestId가 이미 존재하면 중복 요청으로 처리
    if (this.walletRequests.has(requestId)) {
      // 이미 존재하는 요청이면 그대로 반환 (idempotent)
      this.logger.warn(
        `Duplicate wallet request detected: ${requestId}`,
        `${this.constructor.name}.${this.createWalletRequest.name}`,
      );
      return;
    }

    // pending 상태로 저장
    const walletRequest: WalletRequest = {
      requestId,
      organizationId: dto.organizationId,
      coinType: dto.coinType,
      accountId: dto.accountId,
      change: dto.change ?? 0,
      status: -1, // pending
      createdAt: new Date(),
    };

    this.walletRequests.set(requestId, walletRequest);

    this.logger.log(
      `Wallet request created: ${requestId}, coinType: ${dto.coinType}, accountId: ${dto.accountId}`,
      `${this.constructor.name}.${this.createWalletRequest.name}`,
    );

    // TODO: 실제 큐에 적재하는 로직
    // await this.queueService.enqueue('wallet-creation', walletRequest);
  }

  getWalletRequest(requestId: string): WalletRequest | undefined {
    return this.walletRequests.get(requestId);
  }
}
