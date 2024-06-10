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
          console.log(response.data);
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
      console.log(horse);
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

  update(horse: IHorse) {
    return new Promise<IHorse>((resolve, reject) => {
      this.axiosInstance
        .put("horses/" + horse._id, horse)
        .then((response: any) => {
          const horse = this.horse.convertToHorse(response.data);
          resolve(horse);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  delete(horse: IHorse) {
    return new Promise<void>((resolve, reject) => {
      this.axiosInstance
        .delete("horses/" + horse._id)
        .then((response: any) => {
          resolve();
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
