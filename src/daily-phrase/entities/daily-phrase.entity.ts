// src/daily-phrase/entities/daily-phrase.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class DailyPhrase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  author?: string;

  @CreateDateColumn()
  createdAt: Date;
}
