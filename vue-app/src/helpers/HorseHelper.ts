import { IHorse } from "../shared/interfaces/IHorse";
import { DateHelper } from "./DateHelper";
export class HorseHelper {
  dateHelper = new DateHelper();
  beschlagen(horse: IHorse) {
    horse.lastTimeTreated = new Date();
    this.calculateAndSetNextTimeBeschlagen(horse);
  }

  calculateAndSetNextTimeBeschlagen(horse: IHorse) {
    horse.nextTreatment = this.dateHelper.addDays(
      horse.lastTimeTreated,
      horse.numberOfWeeksUntilNextTreatment * 7
    );
  }
}
