import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nest-logger';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletRequest } from '../entities/wallet-request.entity';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([WalletRequest])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
