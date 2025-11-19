import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerModule, HttpLoggerMiddleware } from 'nest-logger';
import { WalletModule } from './wallet/wallet.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';

@Module({
  imports: [LoggerModule, WalletModule, WithdrawalModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
