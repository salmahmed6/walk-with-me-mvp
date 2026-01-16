import { Module } from '@nestjs/common';
import { WalkService } from './walk.service';
import { WalkController } from './walk.controller';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
    controllers: [WalkController, ChatController],
    providers: [WalkService, ChatService],
})
export class WalkModule { }

