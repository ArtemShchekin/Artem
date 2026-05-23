import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { EmployerProfile } from '../employer/entities/employer-profile.entity';

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum TransactionType {
  TOPUP = 'topup',
  UNLOCK = 'unlock',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EmployerProfile)
  @JoinColumn({ name: 'employer_id' })
  employer: EmployerProfile;

  @Column()
  employer_id: string;

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

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ nullable: true })
  payment_method_token?: string;

  @Column({ nullable: true })
  candidate_id?: string; // For unlock transactions

  @CreateDateColumn()
  created_at: Date;
}

@Entity('profile_views')
export class ProfileView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  viewer_id: string; // Employer user ID

  @Column()
  candidate_id: string;

  @Column()
  paid_amount: number;

  @CreateDateColumn()
  unlocked_at: Date;
}
