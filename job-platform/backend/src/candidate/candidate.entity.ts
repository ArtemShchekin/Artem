import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
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

@Entity('candidates')
export class Candidate {
  @PrimaryColumn('uuid')
  userId: string;

  @OneToOne(() => User, (user) => user.candidate)
  @JoinColumn()
  user: User;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: CandidateStatus,
    default: CandidateStatus.NOT_LOOKING,
  })
  status: CandidateStatus;

  @Column({ nullable: true })
  cityId?: number;

  @Column({ default: false })
  contactsHidden: boolean;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  telegram?: string;

  @Column({ nullable: true })
  whatsapp?: string;

  @Column({ nullable: true })
  viber?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => Education, (education) => education.candidate, { cascade: true })
  educations: Education[];

  @OneToMany(() => WorkExperience, (experience) => experience.candidate, { cascade: true })
  workExperiences: WorkExperience[];

  @OneToOne(() => DriverInfo, (driverInfo) => driverInfo.candidate, { cascade: true })
  driverInfo?: DriverInfo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
