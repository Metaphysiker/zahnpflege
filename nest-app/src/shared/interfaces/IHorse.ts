export interface IHorse {
  id: number;
  name: string;
  lastTimeTreated: Date;
  nextTreatment: Date;
  numberOfWeeksUntilNextTreatment: number;
}
