import { Injectable } from '@nestjs/common';
import { Prisma, Todos } from '.prisma/client';
import { Todo } from '../models/todo';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async get(ownerId: number, params: any): Promise<Todos[]> {
    return this.prismaService.todos.findMany({
      where: {
        ownerId,
      },
      skip: 10 * params.page - 10,
      take: 10,
    });
  }

  async getById(todoId: number) {
    return this.prismaService.todos.findUnique({
      where: {
        id: todoId,
      },
    });
  }

  async create(todoODT: Todo): Promise<Todos> {
    return this.prismaService.todos.create({ data: todoODT });
  }

  async update(
    todoId: number,
    ownerId: number,
    todoData: Prisma.TodosUpdateInput,
  ): Promise<Todos | any> {
    return this.prismaService.todos.updateMany({
      where: {
        ownerId,
        id: todoId,
      },
      data: todoData,
    });
  }

  async delete(todoId: number, ownerId: number) {
    return this.prismaService.todos.deleteMany({
      where: {
        id: todoId,
        ownerId,
      },
    });
  }
}
