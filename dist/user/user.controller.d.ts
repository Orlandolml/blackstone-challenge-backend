import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../src/models/user';
import { UserService } from './user.service';
export declare class UserController {
  private userService;
  private jwtService;
  constructor(userService: UserService, jwtService: JwtService);
  getUser(res: Response): Promise<void>;
  create(userData: User, res: Response): Promise<void>;
  login(reqBody: User, res: Response): Promise<void>;
}
