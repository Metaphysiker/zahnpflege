import { IHorse } from 'src/shared/interfaces/IHorse';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Horse implements IHorse {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastTimeTreated: Date;
  @Column()
  nextTreatment: Date;
  @Column()
  numberOfWeeksUntilNextTreatment: number;
}
