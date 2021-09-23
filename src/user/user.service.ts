import { Injectable } from '@nestjs/common';
import { Prisma, User } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userODT: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: userODT });
  }

  async findOne(userId: number, email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
        id: userId,
      },
    });
  }
}
