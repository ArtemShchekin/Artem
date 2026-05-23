import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('employers')
export class Employer {
  @PrimaryColumn('uuid')
  userId: string;

  @OneToOne(() => User, (user) => user.employer)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  companyName?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ nullable: true })
  defaultCardToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
