import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User, CandidateStatus } from '../user/entities/user.entity';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { DriverInfo } from './driver-info.entity';
import { City } from '../city/entities/city.entity';

@Entity('candidate_profiles')
export class CandidateProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  middle_name?: string;

  @Column({ type: 'date', nullable: true })
  birth_date?: Date;

  @Column({
    type: 'enum',
    enum: CandidateStatus,
    default: CandidateStatus.NOT_LOOKING,
  })
  status: CandidateStatus;

  @Column({ nullable: true })
  city_id?: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city?: City;

  @Column({ default: true })
  contacts_hidden: boolean;

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
  education: Education[];

  @OneToMany(() => WorkExperience, (experience) => experience.candidate, { cascade: true })
  workExperiences: WorkExperience[];

  @OneToOne(() => DriverInfo, (driverInfo) => driverInfo.candidate, { cascade: true })
  @JoinColumn()
  driverInfo?: DriverInfo;
}
