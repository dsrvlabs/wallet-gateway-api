import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('withdrawal_receipts')
@Index(['requestId'], { unique: true })
@Index(['txid'])
@Index(['coinType'])
@Index(['createdAt'])
export class WithdrawalReceipt {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'uuid', name: 'request_id' })
  requestId: string;

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
  })
  amount: string;

  @Column({ type: 'text', default: '' })
  txid: string;

  @Column({ type: 'bigint', name: 'block_number', default: 0 })
  blockNumber: number;

  @Column({ type: 'int', default: 0 })
  confirmations: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
