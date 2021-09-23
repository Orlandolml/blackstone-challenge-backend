import { Prisma, User } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(userODT: Prisma.UserCreateInput): Promise<User>;
    findOne(userId: number, email: string): Promise<User>;
}
