import { Module } from '@nestjs/common';
import { LoggerModule } from 'nest-logger';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [LoggerModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
