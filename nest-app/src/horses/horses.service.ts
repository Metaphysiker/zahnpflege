import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Horse as HorseEntity } from './entities/horse.entity';
import { Repository } from 'typeorm';
import { IHorse } from 'src/shared/interfaces/IHorse';

@Injectable()
export class HorsesService {
  constructor(
    @InjectRepository(HorseEntity)
    private horsesRepository: Repository<HorseEntity>,
  ) {}

  async create(horse: IHorse) {
    return await this.horsesRepository.save(horse);
  }

  findAll() {
    return this.horsesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} horse`;
  }

  async update(horse: IHorse) {
    const entity = this.horsesRepository.findOneBy({ id: horse.id });
    await this.horsesRepository.update(
      { id: horse.id },
      Object.assign(entity, horse),
    );
    return entity;
  }

  remove(id: number) {
    console.log('remove', id);
    return this.horsesRepository.delete(id);
  }
}
