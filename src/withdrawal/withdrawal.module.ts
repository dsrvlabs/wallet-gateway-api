import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nest-logger';
import { WithdrawalController } from './withdrawal.controller';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalRequest } from '../entities/withdrawal-request.entity';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([WithdrawalRequest])],
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
})
export class WithdrawalModule {}
