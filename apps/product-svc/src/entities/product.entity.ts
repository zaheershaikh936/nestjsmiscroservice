import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// !other import
import { User } from 'apps/user-svc/src/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productID: string;

  @Column({ type: 'varchar', nullable: false })
  productName: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  userID: string;

  //! Define the foreign key relationship with user database
  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column({ type: 'timestamp', nullable: true, default: new Date() })
  created: Date;

  @Column({ type: 'timestamp', nullable: true, default: new Date() })
  updated: Date = new Date();
}
