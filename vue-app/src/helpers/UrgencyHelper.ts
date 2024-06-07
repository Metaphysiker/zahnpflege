export class UrgencyHelper {
  calculateUrgency(horse) {
    const now = new Date();
    const nextTimeBeschlagen = new Date(horse.nextTimeBeschlagen);
    const difference = nextTimeBeschlagen.getTime() - now.getTime();
    return difference / (1000 * 60 * 60 * 24);
  }

  isNextWeek(horse) {
    return this.calculateUrgency(horse) < 7;
  }

  isNextMonth(horse) {
    return this.calculateUrgency(horse) < 30;
  }

  getColorForUrgency(horse) {
    if (this.isNextWeek(horse)) {
      return "red";
    } else if (this.isNextMonth(horse)) {
      return "yellow";
    } else {
      return "white";
    }
  }

  getClassForUrgency(horse) {
    if (this.isNextWeek(horse)) {
      return "bg-red";
    } else if (this.isNextMonth(horse)) {
      return "bg-yellow";
    } else {
      return "bg-white";
    }
  }
}
