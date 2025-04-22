// src/daily-phrase/dto/update-daily-phrase.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyPhraseDto } from './create-daily-phrase.dto';

export class UpdateDailyPhraseDto extends PartialType(CreateDailyPhraseDto) {}
