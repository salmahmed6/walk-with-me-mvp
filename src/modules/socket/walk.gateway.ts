import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WalkService } from '../walk/walk.service';
import { ChatService } from '../walk/chat.service';

@WebSocketGateway()
export class WalkGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly walkService: WalkService,
        private readonly chatService: ChatService,
    ) { }

    @SubscribeMessage('requestJoin')
    async handleJoinRequest(
        @ConnectedSocket() client: any,
        @MessageBody() data: { walkId: string; userId: string },
    ) {
        await this.walkService.requestJoin(data.walkId, data.userId);
        client.broadcast.emit('joinRequested', data);
    }

    @SubscribeMessage('acceptJoin')
    async handleAccept(
        @MessageBody() data: { walkId: string; userId: string },
    ) {
        return this.walkService.acceptJoin(data.walkId, data.userId);
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(
        @MessageBody()
        data: { walkId: string; senderId: string; content: string },
    ) {
        const message = await this.chatService.sendMessage(
            data.walkId,
            data.senderId,
            data.content,
        );

        this.server.to(data.walkId).emit('newMessage', message);
    }

    @SubscribeMessage('joinWalkRoom')
    handleJoinRoom(
        @ConnectedSocket() client: any,
        @MessageBody() walkId: string,
    ) {
        client.join(walkId);
    }
}
