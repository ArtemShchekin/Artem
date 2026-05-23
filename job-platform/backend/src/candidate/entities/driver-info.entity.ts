import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

export enum LicenseCategory {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  BE = 'BE',
  CE = 'CE',
  DE = 'DE',
  TM = 'TM',
  TB = 'TB',
}

@Entity('driver_info')
export class DriverInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => CandidateProfile, (candidate) => candidate.driverInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateProfile;

  @Column()
  candidate_id: string;

  @Column({ default: false })
  has_own_car: boolean;

  @Column({ type: 'simple-array', nullable: true })
  license_categories?: LicenseCategory[];
}
