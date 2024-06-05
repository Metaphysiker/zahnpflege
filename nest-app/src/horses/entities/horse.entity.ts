import { IHorse } from 'src/shared/interfaces/IHorse';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Horse implements IHorse {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastTimeBeschlagen: Date;
  @Column()
  numberOfWeeksUntilNextBeschlagen: number;
  @Column()
  nextTimeBeschlagen: Date;
}
