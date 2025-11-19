import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum WithdrawalRequestStatus {
  PENDING = -1,
  PROCESSING = 0,
  DONE = 1,
  FAILED = 2,
}

@Entity('withdrawal_requests')
@Index(['requestId'], { unique: true })
export class WithdrawalRequest {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'uuid', name: 'request_id' })
  requestId: string;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'int', name: 'coin_type' })
  coinType: number;

  @Column({ type: 'text', name: 'from_address' })
  fromAddress: string;

  @Column({ type: 'text', name: 'to_address' })
  toAddress: string;

  @Column({
    type: 'decimal',
    precision: 38,
    scale: 18,
    comment: '체인 네이티브 단위 금액',
  })
  amount: string;

  @Column({
    type: 'smallint',
    default: WithdrawalRequestStatus.PENDING,
    comment: '-1=pending, 0=processing, 1=done, 2=failed',
  })
  status: WithdrawalRequestStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
