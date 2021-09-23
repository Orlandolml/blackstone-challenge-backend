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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TodosService = class TodosService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async get(ownerId, params) {
        return this.prismaService.todos.findMany({
            where: {
                ownerId,
            },
            skip: 10 * params.page - 10,
            take: 10,
        });
    }
    async getById(todoId) {
        return this.prismaService.todos.findUnique({
            where: {
                id: todoId,
            },
        });
    }
    async create(todoODT) {
        return this.prismaService.todos.create({ data: todoODT });
    }
    async update(todoId, ownerId, todoData) {
        return this.prismaService.todos.updateMany({
            where: {
                ownerId,
                id: todoId,
            },
            data: todoData,
        });
    }
    async delete(todoId, ownerId) {
        return this.prismaService.todos.deleteMany({
            where: {
                id: todoId,
                ownerId,
            },
        });
    }
};
TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TodosService);
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map