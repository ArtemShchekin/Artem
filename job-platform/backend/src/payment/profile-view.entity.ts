import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('profile_views')
export class ProfileView {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'viewer_id' })
  viewerId!: string; // Employer user ID

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @Column({ name: 'paid_amount', type: 'decimal', precision: 10, scale: 2, nullable: true })
  paidAmount?: number;

  @CreateDateColumn({ name: 'unlocked_at' })
  unlockedAt!: Date;
}
