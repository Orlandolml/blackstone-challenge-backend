import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, Req } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(@Req() req: any, res: any, next: () => void) {
    let token = req.headers.authorization;
    try {
      if (token) {
        token = token.split(' ')[1];
        const userId = this.jwtService.verify(token).userId;

        res.locals = { userId };
        next();
      } else {
        res.json({
          success: false,
          error: {
            message: 'Please sign in your account',
          },
        });
      }
    } catch (error) {
      if (error.message && error.message === 'jwt expired') {
        res.json({
          success: false,
          error: {
            code: 'TOKEN_EXPIRED',
            message: 'Session has expired, please sign in again.',
          },
        });
      }
    }
  }
}
