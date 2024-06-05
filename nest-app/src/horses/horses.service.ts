import { Injectable } from '@nestjs/common';
import { CreateHorseDto } from './dto/create-horse.dto';
import { UpdateHorseDto } from './dto/update-horse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horse } from './entities/horse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HorsesService {
  constructor(
    @InjectRepository(Horse)
    private horsesRepository: Repository<Horse>,
  ) {}

  create(createHorseDto: CreateHorseDto) {
    this.horsesRepository.save(createHorseDto);
  }

  findAll() {
    return this.horsesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} horse`;
  }

  update(id: number, updateHorseDto: UpdateHorseDto) {
    return `This action updates a #${id} horse`;
  }

  remove(id: number) {
    return `This action removes a #${id} horse`;
  }
}
