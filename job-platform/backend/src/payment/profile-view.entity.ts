import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Candidate } from '../candidate/candidate.entity';
import { Employer } from '../employer/employer.entity';

@Entity('profile_views')
export class ProfileView {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'viewer_id' })
  viewer: Employer;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  paidAmount?: number;

  @CreateDateColumn()
  unlockedAt: Date;
}
