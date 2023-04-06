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

  @Column()
    idUser: number;  

  @Column({ default: true })
    isStatus: boolean;

  @Column({ default: false })
    isDelete: boolean;
}
