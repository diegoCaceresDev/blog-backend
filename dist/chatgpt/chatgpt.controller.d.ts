import { ChatgptService } from './chatgpt.service';
import { CreateChatGptDto } from './dto/create-chatgpt.dto';
export declare class ChatgptController {
    private readonly chatgptService;
    constructor(chatgptService: ChatgptService);
    generateResponse(createChatGptDto: CreateChatGptDto): Promise<{
        response: string;
    }>;
}
