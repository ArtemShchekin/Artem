import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
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
  candidateId: string;

  @Column({ name: 'has_own_car', default: false })
  hasOwnCar: boolean;

  @Column({ type: 'simple-array', nullable: true })
  licenseCategories?: LicenseCategory[];
}
