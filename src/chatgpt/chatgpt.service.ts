import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateChatGptDto } from './dto/create-chatgpt.dto';

@Injectable()
export class ChatgptService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Asegúrate de configurar la API Key en las variables de entorno
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
