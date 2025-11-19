import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('wallet')
@Index(['requestId'], { unique: true })
@Index(['address'], { unique: true })
@Index(['organizationId', 'accountId'])
@Index(['createdAt'])
export class Wallet {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'uuid', name: 'request_id' })
  requestId: string;

  @Column({ type: 'uuid', name: 'organization_id', nullable: true })
  organizationId?: string;

  @Column({ type: 'int', name: 'coin_type' })
  coinType: number;

  @Column({ type: 'int', name: 'account_id' })
  accountId: number;

  @Column({ type: 'smallint', default: 0 })
  change: number;

  @Column({ type: 'bigint' })
  index: number;

  @Column({ type: 'text' })
  address: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
