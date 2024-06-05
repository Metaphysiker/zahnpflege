import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() horse: IHorse) {
    return this.horsesService.update(+id, horse);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horsesService.remove(+id);
  }
}
