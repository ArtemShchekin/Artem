import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CandidateProfile, (candidate) => candidate.educations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateProfile;

  @Column()
  candidateId: string;

  @Column({ type: 'enum', enum: EducationLevel })
  level: EducationLevel;

  @Column({ name: 'institution_name' })
  institutionName: string;

  @Column({ nullable: true })
  faculty?: string;

  @Column({ nullable: true })
  specialization?: string;

  @Column({ name: 'graduation_code', nullable: true })
  graduationCode?: string;
}
