import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyPhrase } from './entities/daily-phrase.entity';
import { CreateDailyPhraseDto } from './dto/create-daily-phrase.dto';
import { UpdateDailyPhraseDto } from './dto/update-daily-phrase.dto';

@Injectable()
export class DailyPhraseService {
  constructor(
    @InjectRepository(DailyPhrase)
    private readonly dailyPhraseRepository: Repository<DailyPhrase>,
  ) {}

  async create(createDailyPhraseDto: CreateDailyPhraseDto) {
    try {
      const phrase = this.dailyPhraseRepository.create(createDailyPhraseDto);
      return await this.dailyPhraseRepository.save(phrase);
    } catch (error) {
      throw new InternalServerErrorException('Error saving daily phrase');
    }
  }

  async findAll() {
    try {
      return await this.dailyPhraseRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving daily phrases');
    }
  }

  async findOne(id: string) {
    try {
      const phrase = await this.dailyPhraseRepository.findOne({
        where: { id },
      });
      if (!phrase) {
        throw new NotFoundException('Daily phrase not found');
      }
      return phrase;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving daily phrase');
    }
  }

  async getRandomPhrase() {
    try {
      const phrases = await this.dailyPhraseRepository.find();
      if (!phrases.length) {
        throw new NotFoundException('No daily phrases available');
      }
      const randomIndex = Math.floor(Math.random() * phrases.length);
      return phrases[randomIndex];
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving random phrase');
    }
  }

  async update(id: string, updateDailyPhraseDto: UpdateDailyPhraseDto) {
    try {
      await this.dailyPhraseRepository.update(id, updateDailyPhraseDto);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error updating daily phrase');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.dailyPhraseRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Daily phrase not found');
      }
      return { message: 'Daily phrase deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting daily phrase');
    }
  }
}
