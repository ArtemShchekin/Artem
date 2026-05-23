import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Employer } from '../employer/employer.entity';

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employer_id' })
  employer: Employer;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ nullable: true })
  paymentMethodToken?: string;

  @Column({ nullable: true })
  type: string; // 'topup' или 'unlock'

  @Column({ nullable: true })
  candidateId?: string; // Для разблокировки профиля

  @CreateDateColumn()
  createdAt: Date;
}
