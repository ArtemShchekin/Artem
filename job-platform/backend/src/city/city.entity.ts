import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'Ирак' })
  country: string;

  @Column({ name: 'is_popular', default: false })
  isPopular: boolean;

  @Column({ type: 'point', nullable: true })
  coordinates?: { x: number; y: number };

  @CreateDateColumn()
  createdAt: Date;
}
