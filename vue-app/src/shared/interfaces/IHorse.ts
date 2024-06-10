export interface IHorse {
  _id: number;
  name: string;
  lastTimeTreated: Date;
  nextTreatment: Date;
  numberOfWeeksUntilNextTreatment: number;
}
