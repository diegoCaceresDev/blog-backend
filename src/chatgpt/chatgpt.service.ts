import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateChatGptDto } from './dto/create-chatgpt.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatgptService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    // Inyectar ConfigService
    const apiKey = this.configService.get<string>('OPENAI_API_KEY'); // Obtener la API key
    this.openai = new OpenAI({
      apiKey: apiKey, // Asignar la API Key
    });
  }

  async generateResponse(createChatGptDto: CreateChatGptDto): Promise<string> {
    const { prompt } = createChatGptDto;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      if (error.response?.status === 429) {
        console.error('Quota exceeded:', error.message);
      } else {
        console.error('Error generating response:', error.message);
      }
      throw error;
    }
  }
}
