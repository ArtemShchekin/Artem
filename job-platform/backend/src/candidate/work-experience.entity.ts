import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';

@Entity('work_experiences')
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Candidate, (candidate) => candidate.workExperiences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column()
  companyName: string;

  @Column()
  position: string;

  @Column()
  startMonth: number;

  @Column()
  startYear: number;

  @Column({ nullable: true })
  endMonth?: number;

  @Column({ nullable: true })
  endYear?: number;

  @Column({ default: false })
  isCurrentJob: boolean;

  @Column({ type: 'text', nullable: true })
  responsibilities?: string;
}
