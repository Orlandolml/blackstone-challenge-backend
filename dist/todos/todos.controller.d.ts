import { Response } from 'express';
import { Todo } from 'src/models/todo';
import { UserService } from 'src/user/user.service';
import { TodosService } from '../todos/todos.service';
export declare class TodosController {
    private userService;
    private todosService;
    constructor(userService: UserService, todosService: TodosService);
    getTodos(query: any, res: Response): Promise<void>;
    create(todoBody: Todo, res: Response): Promise<void>;
    updateTodo(todoBody: Todo, todoId: any, res: Response): Promise<void>;
    deleteTodo(todoId: any, res: Response): Promise<void>;
}
