import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('token')
@Index(['chainId', 'symbol'], { unique: true })
export class Token {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', name: 'chain_id' })
  chainId: string;

  @Column({ type: 'text' })
  symbol: string;

  @Column({ type: 'int', name: 'coin_type' })
  coinType: number;

  @Column({ type: 'smallint', name: 'decimal' })
  decimal: number;

  @Column({ type: 'text', name: 'contract_address', nullable: true })
  contractAddress?: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
