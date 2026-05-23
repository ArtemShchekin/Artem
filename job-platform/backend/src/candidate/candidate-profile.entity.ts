import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { DriverInfo } from './driver-info.entity';

export enum CandidateStatus {
  ACTIVELY_LOOKING = 'actively_looking',
  NOT_LOOKING = 'not_looking',
}

@Entity('candidate_profiles')
export class CandidateProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName?: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'enum', enum: CandidateStatus, default: CandidateStatus.NOT_LOOKING })
  status: CandidateStatus;

  @Column({ name: 'city_id', nullable: true })
  cityId?: string;

  @Column({ name: 'contacts_hidden', default: false })
  contactsHidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Education, (education) => education.candidate, { cascade: true })
  educations: Education[];

  @OneToMany(() => WorkExperience, (experience) => experience.candidate, { cascade: true })
  workExperiences: WorkExperience[];

  @OneToOne(() => DriverInfo, (driverInfo) => driverInfo.candidate, { cascade: true, nullable: true })
  @JoinColumn({ name: 'driver_info_id' })
  driverInfo?: DriverInfo;
}
