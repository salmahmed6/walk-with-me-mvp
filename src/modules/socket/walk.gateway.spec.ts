import { WalkGateway } from '../socket/walk.gateway';

describe('WalkGateway', () => {
    let gateway: WalkGateway;
    let walkService: any;

    beforeEach(() => {
        walkService = {
            requestJoin: jest.fn(),
            acceptJoin: jest.fn(),
        };
        gateway = new WalkGateway(walkService);
    });

    it('should emit join request event', async () => {
        const client = {
            emit: jest.fn(),
            broadcast: { emit: jest.fn() }
        } as any;

        await gateway.handleJoinRequest(client, {
            walkId: 'walk-1',
            userId: 'user-2',
        });

        expect(client.broadcast.emit).toHaveBeenCalled();
    });
});
