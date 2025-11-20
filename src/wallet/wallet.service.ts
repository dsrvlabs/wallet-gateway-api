import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from 'nest-logger';
import { CreateWalletRequestDto } from './dto/create-wallet-request.dto';
import { WalletRequest, WalletRequestStatus } from '../entities/wallet-request.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletRequest)
    private readonly walletRequestRepository: Repository<WalletRequest>,
    private readonly logger: LoggerService,
  ) {}

  async createWalletRequest(requestId: string, dto: CreateWalletRequestDto): Promise<number> {
    // Idempotency 체크: 동일한 requestId가 이미 존재하면 중복 요청으로 처리
    const existingRequest = await this.walletRequestRepository.findOne({
      where: { requestId },
    });

    if (existingRequest) {
      throw new ConflictException(`Wallet request with requestId '${requestId}' already exists`);
    }

    // pending 상태로 저장
    const walletRequest = this.walletRequestRepository.create({
      requestId,
      organizationId: dto.organizationId,
      coinType: dto.coinType,
      accountId: dto.accountId,
      change: dto.change ?? 0,
      status: WalletRequestStatus.PENDING,
    });

    const savedRequest = await this.walletRequestRepository.save(walletRequest);

    return savedRequest.id;
  }

  async getWalletRequest(requestId: string): Promise<WalletRequest | null> {
    return await this.walletRequestRepository.findOne({
      where: { requestId },
    });
  }
}
