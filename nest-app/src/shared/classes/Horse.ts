import { IHorse } from "../interfaces/IHorse";

export class Horse implements IHorse {
  _id: number;
  name: string;
  lastTimeTreated: Date;
  nextTreatment: Date;
  numberOfWeeksUntilNextTreatment: number;

  constructor() {
    this._id = 0;
    this.name = "";
    this.lastTimeTreated = new Date();
    this.nextTreatment = new Date();
    this.numberOfWeeksUntilNextTreatment = 8;
  }

  clone(original: IHorse): IHorse {
    const horse = new Horse();
    horse._id = original._id;
    horse.name = original.name;
    horse.lastTimeTreated = new Date(original.lastTimeTreated);
    horse.nextTreatment = new Date(original.nextTreatment);
    horse.numberOfWeeksUntilNextTreatment =
      original.numberOfWeeksUntilNextTreatment;
    return horse;
  }

  convertToHorse(horse: IHorse): Horse {
    this._id = horse._id;
    this.name = horse.name;
    this.lastTimeTreated = new Date(horse.lastTimeTreated);
    this.nextTreatment = new Date(horse.nextTreatment);
    this.numberOfWeeksUntilNextTreatment =
      horse.numberOfWeeksUntilNextTreatment;
    return this;
  }

  convertToHorses(horses: IHorse[]): Horse[] {
    return horses.map((horse) => {
      return new Horse().convertToHorse(horse);
    });
  }
}
