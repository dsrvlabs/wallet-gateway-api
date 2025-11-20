import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from 'nest-logger';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { WithdrawalRequest, WithdrawalRequestStatus } from '../entities/withdrawal-request.entity';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(WithdrawalRequest)
    private readonly withdrawalRequestRepository: Repository<WithdrawalRequest>,
    private readonly logger: LoggerService,
  ) {}

  async createWithdrawalRequest(
    requestId: string,
    dto: CreateWithdrawalRequestDto,
  ): Promise<number> {
    // Idempotency 체크: 동일한 requestId가 이미 존재하면 중복 요청으로 처리
    const existingRequest = await this.withdrawalRequestRepository.findOne({
      where: { requestId },
    });

    if (existingRequest) {
      throw new ConflictException(
        `Withdrawal request with requestId '${requestId}' already exists`,
      );
    }

    // pending 상태로 저장
    const withdrawalRequest = this.withdrawalRequestRepository.create({
      requestId,
      organizationId: dto.organizationId,
      coinType: dto.coinType,
      fromAddress: dto.from,
      toAddress: dto.to,
      amount: dto.amount,
      status: WithdrawalRequestStatus.PENDING,
    });

    const savedRequest = await this.withdrawalRequestRepository.save(withdrawalRequest);

    this.logger.log(
      `Withdrawal request created: id=${savedRequest.id}, requestId=${requestId}, coinType=${dto.coinType}, amount=${dto.amount}`,
      `${this.constructor.name}.${this.createWithdrawalRequest.name}`,
    );

    // TODO: 실제 오케스트레이터에 전달하는 로직
    // await this.orchestratorService.processWithdrawal(withdrawalRequest);

    return savedRequest.id;
  }

  async getWithdrawalRequest(requestId: string): Promise<WithdrawalRequest | null> {
    return await this.withdrawalRequestRepository.findOne({
      where: { requestId },
    });
  }
}
