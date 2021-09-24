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
exports.UserController = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async getUser(res) {
        try {
            let userId = res.locals.userId;
            let user = await this.userService.findOne(userId, undefined);
            delete user.password;
            res.json({
                success: true,
                data: user,
            });
        }
        catch (error) {
            res.json({
                success: false,
                error,
            });
        }
    }
    async create(userData, res) {
        try {
            if (Boolean(Object.values(userData).length)) {
                let password = userData.password;
                userData.password = await bcrypt.hash(password, 10);
                let data = await this.userService.createUser(userData);
                res.json({
                    success: true,
                    token: this.jwtService.sign({ userId: data.id }),
                });
            }
        }
        catch (error) {
            if (error.code === 'P2002') {
                res.status(common_1.HttpStatus.CONFLICT).json({
                    success: false,
                    error: {
                        message: 'This user already exists',
                    },
                });
            }
            res.status(common_1.HttpStatus.NOT_FOUND).json({
                success: false,
                error,
            });
        }
    }
    async login(reqBody, res) {
        try {
            let { email, password } = reqBody;
            const user = await this.userService.findOne(undefined, email);
            if (user && (await bcrypt.compare(password, user.password))) {
                res.json({
                    success: true,
                    token: this.jwtService.sign({ userId: user.id }),
                });
            }
            else {
                res.json({
                    success: false,
                    error: {
                        message: 'Invalid user credentials',
                    },
                });
            }
        }
        catch (error) {
            res.status(common_1.HttpStatus.NOT_FOUND).json({
                success: false,
                error,
            });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map