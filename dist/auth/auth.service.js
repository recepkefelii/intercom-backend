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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const argon2_1 = require("argon2");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(configService, userRepository) {
        this.configService = configService;
        this.userRepository = userRepository;
    }
    async login(loginDto) {
        const user = await this.userRepository.user.findUnique({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const valid = await (0, argon2_1.verify)(user.password, loginDto.password);
        if (!valid) {
            throw new Error('password is not valid');
        }
        const payload = {
            email: user.email,
            password: user.password,
            username: user.username,
            ProfilPhotoPath: user.ProfilPhotoPath,
        };
        const accessToken = this.payload(payload);
        return { accessToken };
    }
    async register(registerDto) {
        registerDto.password = await (0, argon2_1.hash)(registerDto.password);
        try {
            const user = await this.userRepository.user.create({
                data: registerDto,
            });
            const payload = {
                id: user.id,
                email: user.email,
                username: user.username,
                ProfilPhotoPath: user.ProfilPhotoPath,
                lastName: user.lastName,
                firstName: user.firstName,
            };
            const accessToken = this.payload(payload);
            return { accessToken };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ForbiddenException('User email already exists');
            }
            throw new Error(error);
        }
    }
    payload(payload) {
        return (0, jsonwebtoken_1.sign)(payload, this.configService.get('SECRET_KEY'));
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map