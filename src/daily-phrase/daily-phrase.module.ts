// src/daily-phrase/daily-phrase.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyPhraseService } from './daily-phrase.service';
import { DailyPhraseController } from './daily-phrase.controller';
import { DailyPhrase } from './entities/daily-phrase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyPhrase])],
  providers: [DailyPhraseService],
  controllers: [DailyPhraseController],
  exports: [TypeOrmModule, DailyPhraseService],
})
export class DailyPhraseModule {}
