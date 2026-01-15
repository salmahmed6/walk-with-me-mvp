import { WalkGateway } from './walk.gateway';

describe('WalkGateway', () => {
    let gateway: WalkGateway;

    beforeEach(() => {
        gateway = new WalkGateway();
    });

    it('should emit join request event', () => {
        const client = { emit: jest.fn() } as any;

        gateway.handleJoinRequest(client, {
            walkId: 'walk-1',
            userId: 'user-2',
        });

        expect(client.emit).toHaveBeenCalled();
    });
});
