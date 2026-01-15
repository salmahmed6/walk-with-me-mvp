import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { WalkService } from '../walk/walk.service';

@WebSocketGateway()
export class WalkGateway {
    constructor(private readonly walkService: WalkService) { }

    @SubscribeMessage('requestJoin')
    async handleJoinRequest(
        @ConnectedSocket() client,
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
}
