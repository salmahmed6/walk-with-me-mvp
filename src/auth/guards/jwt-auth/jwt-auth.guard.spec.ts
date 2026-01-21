import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    const mockReflector = ({ getAllAndOverride: () => undefined } as unknown) as any;
    expect(new JwtAuthGuard(mockReflector)).toBeDefined();
  });
});
