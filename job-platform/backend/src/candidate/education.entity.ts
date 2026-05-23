import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';

export enum EducationLevel {
  SECONDARY = 'secondary',
  SECONDARY_SPECIAL = 'secondary_special',
  INCOMPLETE_HIGHER = 'incomplete_higher',
  HIGHER = 'higher',
  BACHELOR = 'bachelor',
  MASTER = 'master',
  PHD = 'phd',
  DOCTOR = 'doctor',
}

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Candidate, (candidate) => candidate.educations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ type: 'enum', enum: EducationLevel })
  level: EducationLevel;

  @Column()
  institutionName: string;

  @Column({ nullable: true })
  faculty?: string;

  @Column({ nullable: true })
  specialization?: string;

  @Column({ nullable: true })
  graduationCode?: string;
}
