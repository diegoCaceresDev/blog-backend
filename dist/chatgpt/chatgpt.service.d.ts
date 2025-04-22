import { CreateChatGptDto } from './dto/create-chatgpt.dto';
import { ConfigService } from '@nestjs/config';
export declare class ChatgptService {
    private readonly configService;
    private openai;
    constructor(configService: ConfigService);
    generateResponse(createChatGptDto: CreateChatGptDto): Promise<string>;
}
