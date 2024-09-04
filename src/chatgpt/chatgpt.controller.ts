import { Controller, Post, Body } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { CreateChatGptDto } from './dto/create-chatgpt.dto';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post('prompt')
  async generateResponse(@Body() createChatGptDto: CreateChatGptDto) {
    const response =
      await this.chatgptService.generateResponse(createChatGptDto);
    return { response };
  }
}
