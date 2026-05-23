import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

export enum UserRole {
  CANDIDATE = 'candidate',
  EMPLOYER = 'employer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  passwordHash?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Candidate, (candidate) => candidate.user, { cascade: true })
  candidate?: Candidate;

  @OneToOne(() => Employer, (employer) => employer.user, { cascade: true })
  employer?: Employer;
}

// Импорт после объявления класса для избежания циклических зависимостей
import { Candidate } from '../candidate/candidate.entity';
import { Employer } from '../employer/employer.entity';
