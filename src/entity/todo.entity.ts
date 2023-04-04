import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column({ length: 500 })
    name: string;

  @Column()
    dateStart: Date;

  @Column()
    dateEnd: Date;

  @Column({ default: true })
    isStatus: boolean;
}
