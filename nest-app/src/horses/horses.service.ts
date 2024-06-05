import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Horse as HorseEntity } from './entities/horse.entity';
import { Repository } from 'typeorm';
import { Horse } from 'src/shared/classes/Horse';
import { IHorse } from 'src/shared/interfaces/IHorse';

@Injectable()
export class HorsesService {
  constructor(
    @InjectRepository(HorseEntity)
    private horsesRepository: Repository<HorseEntity>,
  ) {}

  create(horse: IHorse) {
    this.horsesRepository.save(horse);
  }

  findAll() {
    return this.horsesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} horse`;
  }

  update(id: number, horse: IHorse) {
    return `This action updates a #${id} horse`;
  }

  remove(id: number) {
    return `This action removes a #${id} horse`;
  }
}
