import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => CandidateProfile, (candidate) => candidate.education, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateProfile;

  @Column()
  candidate_id: string;

  @Column({
    type: 'enum',
    enum: EducationLevel,
  })
  level: EducationLevel;

  @Column()
  institution_name: string;

  @Column({ nullable: true })
  faculty?: string;

  @Column({ nullable: true })
  specialization?: string;

  @Column({ nullable: true })
  graduation_code?: string;
}
