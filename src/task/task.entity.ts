import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
// @Entity({ name: 'data' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;
}
