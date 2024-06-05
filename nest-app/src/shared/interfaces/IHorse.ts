export interface IHorse {
  id: number;
  name: string;
  lastTimeBeschlagen: Date;
  nextTimeBeschlagen: Date;
  numberOfWeeksUntilNextBeschlagen: number;
}
