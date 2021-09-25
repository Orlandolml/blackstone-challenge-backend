import { Injectable } from '@nestjs/common';
import { Prisma, Todos } from '.prisma/client';
import { Todo } from '../models/todo';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async get(ownerId: number): Promise<Todos[]> {
    return this.prismaService.todos.findMany({
      where: {
        ownerId,
      },
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
    let data = {
      ...todoData,
    };

    if (todoData.dueDate) {
      data.dueDate = new Date(todoData.dueDate.toString());
    }

    return this.prismaService.todos.updateMany({
      where: {
        ownerId,
        id: todoId,
      },
      data: data,
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
