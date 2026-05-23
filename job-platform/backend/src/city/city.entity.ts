import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'Ирак' })
  country: string;

  @Column({ default: false })
  isPopular: boolean;

  // PostGIS колонка для координат (упрощенно как varchar)
  @Column({ nullable: true })
  coordinates?: string;

  @CreateDateColumn()
  createdAt: Date;
}
