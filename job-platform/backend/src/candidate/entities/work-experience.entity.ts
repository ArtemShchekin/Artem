import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

@Entity('work_experiences')
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CandidateProfile, (candidate) => candidate.workExperiences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateProfile;

  @Column()
  candidate_id: string;

  @Column()
  company_name: string;

  @Column()
  position: string;

  @Column()
  start_month: number;

  @Column()
  start_year: number;

  @Column({ nullable: true })
  end_month?: number;

  @Column({ nullable: true })
  end_year?: number;

  @Column({ default: false })
  is_current_job: boolean;

  @Column({ type: 'text', nullable: true })
  responsibilities?: string;
}
