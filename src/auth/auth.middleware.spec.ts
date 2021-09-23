import { AuthMiddleware } from './auth.middleware';
import { JwtService } from '@nestjs/jwt';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware(new JwtService({}))).toBeDefined();
  });
});
