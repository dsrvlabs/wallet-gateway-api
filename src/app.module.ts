import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule, HttpLoggerMiddleware } from 'nest-logger';
import { WalletModule } from './wallet/wallet.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { Token, WalletRequest, Wallet, WithdrawalRequest, WithdrawalReceipt } from './entities';
import { loadDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          const dbConfig = loadDatabaseConfig();
          return {
            database: dbConfig,
          };
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [Token, WalletRequest, Wallet, WithdrawalRequest, WithdrawalReceipt],
          synchronize: dbConfig.synchronize,
          logging: dbConfig.logging,
        };
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    WalletModule,
    WithdrawalModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
