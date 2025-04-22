// src/daily-phrase/daily-phrase.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { DailyPhraseService } from './daily-phrase.service';
import { CreateDailyPhraseDto } from './dto/create-daily-phrase.dto';
import { UpdateDailyPhraseDto } from './dto/update-daily-phrase.dto';
import {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('daily-phrase')
export class DailyPhraseController {
  constructor(private readonly dailyPhraseService: DailyPhraseService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDailyPhraseDto: CreateDailyPhraseDto) {
    try {
      return await this.dailyPhraseService.create(createDailyPhraseDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating daily phrase');
    }
  }

  @Get('random')
  async getRandomPhrase() {
    try {
      return await this.dailyPhraseService.getRandomPhrase();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving daily phrase');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.dailyPhraseService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving daily phrases');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const phrase = await this.dailyPhraseService.findOne(id);
      if (!phrase) {
        throw new NotFoundException('Phrase not found');
      }
      return phrase;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving phrase');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDailyPhraseDto: UpdateDailyPhraseDto,
  ) {
    try {
      return await this.dailyPhraseService.update(id, updateDailyPhraseDto);
    } catch (error) {
      throw new InternalServerErrorException('Error updating phrase');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.dailyPhraseService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting phrase');
    }
  }
}
