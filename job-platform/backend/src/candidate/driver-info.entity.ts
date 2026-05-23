import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';

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
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Candidate, (candidate) => candidate.driverInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ default: false })
  hasOwnCar: boolean;

  @Column({
    type: 'enum',
    enum: LicenseCategory,
    array: true,
    default: [],
  })
  licenseCategories: LicenseCategory[];
}
