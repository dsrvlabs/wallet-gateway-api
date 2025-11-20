import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum WalletRequestStatus {
  PENDING = -1,
  PROCESSING = 0,
  DONE = 1,
  FAILED = 2,
}

@Entity('wallet_requests')
@Index(['requestId'], { unique: true })
export class WalletRequest {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'uuid', name: 'request_id' })
  requestId: string;

  @Column({ type: 'text', name: 'organization_id', nullable: true })
  organizationId: string;

  @Column({ type: 'int', name: 'coin_type' })
  coinType: number;

  @Column({ type: 'int', name: 'account_id' })
  accountId: number;

  @Column({ type: 'smallint', default: 0 })
  change: number;

  @Column({
    type: 'smallint',
    default: WalletRequestStatus.PENDING,
    comment:
      '-1=pending(처리 대기), 0=processing(처리 진행), 1=done(처리 완료), 2=failed(처리 실패)',
  })
  status: WalletRequestStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
