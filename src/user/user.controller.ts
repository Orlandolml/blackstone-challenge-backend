import * as bcrypt from 'bcrypt';
import {
  Get,
  Req,
  Res,
  Body,
  Post,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
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

        return res.json({
          success: true,
          token: this.jwtService.sign({ userId: data.id }),
        });
      }
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(HttpStatus.CONFLICT).json({
          success: false,
          error: {
            message: 'This user already exists',
          },
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error,
      });
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() reqBody: User, @Res() res: Response) {
    try {
      let { email, password } = reqBody;
      const user = await this.userService.findOne(undefined, email);

      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          success: true,
          token: this.jwtService.sign({ userId: user.id }),
        });
      }
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error,
      });
    }
  }
}
