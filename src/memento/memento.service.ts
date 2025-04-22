import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class MementoService {
  calculateRemainingLife(age: number, lifeExpectancy: number) {
    if (typeof age !== 'number' || age < 0) {
      throw new BadRequestException('La edad debe ser un número positivo.');
    }

    if (typeof lifeExpectancy !== 'number' || lifeExpectancy <= 0) {
      throw new BadRequestException(
        'La expectativa de vida debe ser un número positivo.',
      );
    }

    const yearsLeft = Math.max(lifeExpectancy - age, 0);
    return {
      age,
      yearsLeft,
      monthsLeft: yearsLeft * 12,
      weeksLeft: yearsLeft * 52,
    };
  }

  getUserMementoData(user: User) {
    if (!user.birthDate || !user.lifeExpectancy) {
      throw new BadRequestException(
        'Faltan datos del usuario para calcular la expectativa de vida.',
      );
    }
    const birthYear = new Date(user.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    return this.calculateRemainingLife(age, user.lifeExpectancy);
  }
}
