import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HorsesService } from './horses.service';
import { IHorse } from 'src/shared/interfaces/IHorse';

@Controller('horses')
export class HorsesController {
  constructor(private readonly horsesService: HorsesService) {}

  @Post()
  create(@Body() horse: IHorse) {
    console.log(horse);
    return this.horsesService.create(horse);
  }

  @Get()
  findAll() {
    return this.horsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horsesService.findOne(+id);
  }

  @Put()
  update(@Body() horse: IHorse) {
    return this.horsesService.update(horse);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horsesService.remove(+id);
  }
}
