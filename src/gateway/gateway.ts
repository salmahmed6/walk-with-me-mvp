import { OnModuleInit } from '@nestjs/common';
import { 
    WebSocketGateway,
    SubscribeMessage,
    MessageBody, 
    WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('New client connected:', socket.id);
            console.log('Connected');
        });
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any){
        console.log(body);
        this.server.emit('onMessage', {
            msg: 'new message from server',
            content: body,
        });
    }
}
