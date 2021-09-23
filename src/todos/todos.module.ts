import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [UserService, PrismaService, TodosService],
})
export class TodosModule {}
