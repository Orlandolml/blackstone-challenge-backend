import { Prisma, Todos } from '.prisma/client';
import { Todo } from '../models/todo';
import { PrismaService } from '../prisma/prisma.service';
export declare class TodosService {
    private prismaService;
    constructor(prismaService: PrismaService);
    get(ownerId: number, params: any): Promise<Todos[]>;
    getById(todoId: number): Promise<Todos>;
    create(todoODT: Todo): Promise<Todos>;
    update(todoId: number, ownerId: number, todoData: Prisma.TodosUpdateInput): Promise<Todos | any>;
    delete(todoId: number, ownerId: number): Promise<Prisma.BatchPayload>;
}
