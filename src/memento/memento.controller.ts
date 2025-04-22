import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MementoService } from './memento.service';
import { CalculateMementoDto } from './dto/calculate-memento.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('memento')
export class MementoController {
  constructor(private readonly mementoService: MementoService) { }

  // Ruta pública
  @Post('calculate')
  calculate(@Body() data: CalculateMementoDto) {
    try {
      if (!data.birthDate || !data.lifeExpectancy) {
        throw new BadRequestException(
          'birthDate y lifeExpectancy son requeridos.',
        );
      }

      const birthDate = new Date(data.birthDate);
      if (isNaN(birthDate.getTime())) {
        throw new BadRequestException('birthDate no es una fecha válida.');
      }

      if (typeof data.lifeExpectancy !== 'number' || data.lifeExpectancy <= 0) {
        throw new BadRequestException(
          'lifeExpectancy debe ser un número positivo.',
        );
      }

      const currentYear = new Date().getFullYear();
      const birthYear = birthDate.getFullYear();
      const age = currentYear - birthYear;

      return this.mementoService.calculateRemainingLife(
        age,
        data.lifeExpectancy,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al calcular: ${error.message}`,
      );
    }
  }

  // Ruta protegida
  @UseGuards(JwtAuthGuard)
  @Get('calculate')
  calculateForUser(@Request() req) {
    try {
      const result = this.mementoService.getUserMementoData(req.user);
      if (!result) {
        throw new BadRequestException(
          'El usuario no tiene información suficiente para calcular.',
        );
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en la ruta protegida: ${error.message}`,
      );
    }
  }
}
