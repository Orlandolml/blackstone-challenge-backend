"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const todos_service_1 = require("../todos/todos.service");
let TodosController = class TodosController {
    constructor(userService, todosService) {
        this.userService = userService;
        this.todosService = todosService;
    }
    async getTodos(query, res) {
        try {
            let page = query.page;
            let userId = res.locals.userId;
            let todos = await this.todosService.get(userId, { page });
            res.json({
                success: true,
                data: todos,
            });
        }
        catch (error) {
            res.status(common_1.HttpStatus.NOT_FOUND).json({
                success: false,
                error: Object.assign({}, error),
            });
        }
    }
    async create(todoBody, res) {
        try {
            let user = await this.userService.findOne(res.locals.userId, undefined);
            let ownerId = user.id;
            let todo = await this.todosService.create(Object.assign(Object.assign({}, todoBody), { ownerId, dueDate: new Date(todoBody.dueDate) }));
            res.json({
                success: true,
                data: { todo },
            });
        }
        catch (error) {
            res.json({
                success: false,
                error,
            });
        }
    }
    async updateTodo(todoBody, todoId, res) {
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
            }
            else {
                res.json({
                    success: false,
                    error: {
                        message: 'No todo with that id was found',
                    },
                });
                res.status(common_1.HttpStatus.NO_CONTENT);
            }
        }
        catch (error) {
            res.json({
                success: false,
                error,
            });
        }
    }
    async deleteTodo(todoId, res) {
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
            }
            else {
                res.json({
                    success: false,
                    error: {
                        message: 'No todo with that id was found',
                    },
                });
                res.status(common_1.HttpStatus.NO_CONTENT);
            }
        }
        catch (error) {
            res.json({
                success: false,
                error,
            });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getTodos", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:todoId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('todoId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Delete)('/:todoId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('todoId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "deleteTodo", null);
TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        todos_service_1.TodosService])
], TodosController);
exports.TodosController = TodosController;
//# sourceMappingURL=todos.controller.js.map