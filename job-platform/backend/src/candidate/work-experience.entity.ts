import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

@Entity('work_experiences')
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CandidateProfile, (candidate) => candidate.workExperiences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateProfile;

  @Column()
  candidateId: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column()
  position: string;

  @Column({ name: 'start_month' })
  startMonth: number;

  @Column({ name: 'start_year' })
  startYear: number;

  @Column({ name: 'end_month', nullable: true })
  endMonth?: number;

  @Column({ name: 'end_year', nullable: true })
  endYear?: number;

  @Column({ name: 'is_current_job', default: false })
  isCurrentJob: boolean;

  @Column({ type: 'text', nullable: true })
  responsibilities?: string;
}
