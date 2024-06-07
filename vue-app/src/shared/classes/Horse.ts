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
    this.nextTimeBeschlagen = new Date();
    this.numberOfWeeksUntilNextBeschlagen = 8;
  }

  clone(original: IHorse): IHorse {
    const horse = new Horse();
    horse.id = original.id;
    horse.name = original.name;
    horse.lastTimeBeschlagen = new Date(original.lastTimeBeschlagen);
    horse.nextTimeBeschlagen = new Date(original.nextTimeBeschlagen);
    horse.numberOfWeeksUntilNextBeschlagen =
      original.numberOfWeeksUntilNextBeschlagen;
    return horse;
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
    return horses.map((horse) => {
      return new Horse().convertToHorse(horse);
    });
  }
}
