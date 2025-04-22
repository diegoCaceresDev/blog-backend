import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('images/:imageName')
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    try {
      const imagePath = join(process.cwd(), 'public/images', imageName);

      // Check if file exists before sending
      if (!fs.existsSync(imagePath)) {
        console.log(`Image not found: ${imagePath}`);
        throw new NotFoundException('Image not found');
      }

      console.log(`Serving image from: ${imagePath}`);
      return res.sendFile(imagePath);
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        console.error(`Error serving image ${imageName}:`, error);
        throw new NotFoundException('Error processing image');
      }
      throw error;
    }
  }
}
