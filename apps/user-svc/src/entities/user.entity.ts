import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  UserID: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'timestamp', nullable: true, default: new Date() })
  created: Date;

  @Column({ type: 'timestamp', nullable: true, default: new Date() })
  updated: Date = new Date();

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'user',
    enum: ['user', 'admin'],
  })
  role: string;
}
