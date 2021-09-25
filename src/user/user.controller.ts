import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Get, Res, Body, Post, HttpCode, Controller } from '@nestjs/common';
import { User } from '../models/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @HttpCode(200)
  async getUser(@Res() res: Response) {
    try {
      let userId = res.locals.userId;
      let user = await this.userService.findOne(userId, undefined);

      delete user.password;

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  @Post()
  @HttpCode(200)
  async create(@Body() userData: User, @Res() res: Response) {
    try {
      if (Boolean(Object.values(userData).length)) {
        let password = userData.password;
        userData.password = await bcrypt.hash(password, 10);
        let data = await this.userService.createUser(userData);

        res.json({
          success: true,
          token: this.jwtService.sign({ userId: data.id }),
        });
      }
    } catch (error) {
      if (error.code === 'P2002') {
        res.json({
          success: false,
          error: {
            message: 'This user already exists',
          },
        });
      } else {
        res.json({
          success: false,
          error,
        });
      }
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() reqBody: User, @Res() res: Response) {
    try {
      let { email, password } = reqBody;
      const user = await this.userService.findOne(undefined, email);

      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          success: true,
          token: this.jwtService.sign({ userId: user.id }),
        });
      } else {
        res.json({
          success: false,
          error: {
            message: 'Invalid user credentials',
          },
        });
      }
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
