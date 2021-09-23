import { JwtService } from '@nestjs/jwt';
import { NestMiddleware } from '@nestjs/common';
export declare class AuthMiddleware implements NestMiddleware {
    private jwtService;
    constructor(jwtService: JwtService);
    use(req: any, res: any, next: () => void): Promise<void>;
}
