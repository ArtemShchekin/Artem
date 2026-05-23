import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'Ирак' })
  country: string;

  @Column({ default: false })
  is_popular: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  coordinates?: string; // Format: "lat,lng" for PostGIS or simple storage
}
