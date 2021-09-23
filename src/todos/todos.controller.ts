import {
  Get,
  Res,
  Post,
  Body,
  Query,
  HttpCode,
  Controller,
  HttpStatus,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { response, Response } from 'express';
import { Todo } from 'src/models/todo';
import { UserService } from 'src/user/user.service';
import { TodosService } from '../todos/todos.service';

@Controller('todos')
export class TodosController {
  constructor(
    private userService: UserService,
    private todosService: TodosService,
  ) {}

  @Get()
  @HttpCode(200)
  async getTodos(@Query() query, @Res() res: Response) {
    try {
      let page = query.page;
      let userId = res.locals.userId;
      let todos = await this.todosService.get(userId, { page });

      res.json({
        success: true,
        data: todos,
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: {
          ...error,
        },
      });
    }
  }

  @Post()
  @HttpCode(200)
  async create(@Body() todoBody: Todo, @Res() res: Response) {
    try {
      let user = await this.userService.findOne(res.locals.userId, undefined);
      let ownerId = user.id;
      let todo = await this.todosService.create({
        ...todoBody,
        ownerId,
        dueDate: new Date(todoBody.dueDate),
      });

      res.json({
        success: true,
        data: { todo },
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  @Put('/:todoId')
  @HttpCode(200)
  async updateTodo(
    @Body() todoBody: Todo,
    @Param('todoId') todoId,
    @Res() res: Response,
  ) {
    try {
      let userId = res.locals.userId;
      todoId = Number(todoId);
      let response = await this.todosService.update(todoId, userId, todoBody);

      if (response.count && response.count === 1) {
        let todoUpdated = await this.todosService.getById(todoId);
        res.json({
          success: true,
          data: todoUpdated,
        });
      } else {
        res.json({
          success: false,
          error: {
            message: 'No todo with that id was found',
          },
        });
        res.status(HttpStatus.NO_CONTENT);
      }
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  @Delete('/:todoId')
  @HttpCode(200)
  async deleteTodo(@Param('todoId') todoId, @Res() res: Response) {
    let userId = res.locals.userId;
    try {
      todoId = Number(todoId);
      let response = await this.todosService.delete(todoId, userId);

      if (response.count && response.count === 1) {
        res.json({
          success: true,
          data: {
            message: 'The todo was succesfully eliminated!',
          },
        });
      } else {
        res.json({
          success: false,
          error: {
            message: 'No todo with that id was found',
          },
        });
        res.status(HttpStatus.NO_CONTENT);
      }
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
