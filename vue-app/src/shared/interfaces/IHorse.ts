export interface IHorse {
  _id: number;
  name: string;
  lastTimeBeschlagen: Date;
  nextTimeBeschlagen: Date;
  numberOfWeeksUntilNextBeschlagen: number;
}
