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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    constructor(config) {
        this.config = config;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        request.user = this.validateToken(request.headers.authorization);
        return true;
    }
    validateToken(auth) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
        }
        const token = auth.split(' ')[1];
        const decoded = this.verifyToken(token);
        return decoded;
    }
    verifyToken(token) {
        return (0, jsonwebtoken_1.verify)(token, this.config.get('SECRET_KEY'));
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map