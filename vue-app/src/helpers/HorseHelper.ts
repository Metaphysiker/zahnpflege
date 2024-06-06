import { IHorse } from "../shared/interfaces/IHorse";
import { DateHelper } from "./DateHelper";
export class HorseHelper {
  dateHelper = new DateHelper();
  beschlagen(horse: IHorse) {
    horse.lastTimeBeschlagen = new Date();
    horse.nextTimeBeschlagen = this.dateHelper.addDays(
      horse.lastTimeBeschlagen,
      horse.numberOfWeeksUntilNextBeschlagen * 7
    );
  }
}
