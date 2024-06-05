import { IHorse } from "../interfaces/IHorse";

export class Horse implements IHorse {
  id: number;
  name: string;
  lastTimeBeschlagen: Date;
  numberOfWeeksUntilNextBeschlagen: number;
  nextTimeBeschlagen: Date;

  constructor() {
    this.id = 0;
    this.name = "";
    this.lastTimeBeschlagen = new Date();
    this.numberOfWeeksUntilNextBeschlagen = 0;
  }

  convertToHorse(horse: IHorse): Horse {
    this.id = horse.id;
    this.name = horse.name;
    this.numberOfWeeksUntilNextBeschlagen =
      horse.numberOfWeeksUntilNextBeschlagen;
    this.lastTimeBeschlagen = new Date(horse.lastTimeBeschlagen);
    this.nextTimeBeschlagen = new Date(horse.nextTimeBeschlagen);
    return this;
  }

  convertToHorses(horses: IHorse[]): Horse[] {
    return horses.map((horse: IHorse) => {
      return this.convertToHorse(horse);
    });
  }
}
