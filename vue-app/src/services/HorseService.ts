import { AxiosStatic } from "axios";
import { IService } from "../interfaces/IService";
import { AxiosInstanceFactory } from "../factories/AxiosInstanceFactory";
import { IHorse } from "../shared/interfaces/IHorse";
import { Horse } from "../shared/classes/Horse";

export class HorseService implements IService {
  horse: Horse = new Horse();
  axiosInstance: AxiosStatic;
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios);
  }

  findAll() {
    return new Promise<IHorse[]>((resolve, reject) => {
      this.axiosInstance
        .get("horses")
        .then((response: any) => {
          const horses = this.horse.convertToHorses(response.data);
          resolve(horses);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  create(horse: IHorse) {
    return new Promise<IHorse>((resolve, reject) => {
      this.axiosInstance
        .post("horses", horse)
        .then((response: any) => {
          const horse = this.horse.convertToHorse(response.data);
          resolve(horse);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
