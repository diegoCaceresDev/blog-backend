import { Module } from '@nestjs/common';
import { MementoService } from './memento.service';
import { MementoController } from './memento.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [MementoService],
  controllers: [MementoController],
})
export class MementoModule { }
