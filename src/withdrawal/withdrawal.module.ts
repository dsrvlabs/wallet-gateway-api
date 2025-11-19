import { Module } from '@nestjs/common';
import { LoggerModule } from 'nest-logger';
import { WithdrawalController } from './withdrawal.controller';
import { WithdrawalService } from './withdrawal.service';

@Module({
  imports: [LoggerModule],
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
})
export class WithdrawalModule {}
