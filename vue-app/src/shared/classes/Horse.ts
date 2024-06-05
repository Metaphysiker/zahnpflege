import { IHorse } from "../interfaces/IHorse";

export class Horse implements IHorse {
  id: number;
  name: string;
  lastTimeBeschlagen: Date;
  numberOfWeeksUntilNextBeschlag: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.lastTimeBeschlagen = new Date();
    this.numberOfWeeksUntilNextBeschlag = 0;
  }
}
