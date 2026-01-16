import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('walk/:walkId/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post()
    send(
        @Param('walkId') walkId: string,
        @Body() body: { senderId: string; content: string },
    ) {
        return this.chatService.sendMessage(
            walkId,
            body.senderId,
            body.content,
        );
    }

    @Get()
    getMessages(@Param('walkId') walkId: string) {
        return this.chatService.getMessages(walkId);
    }
}
