"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const follow_module_1 = require("./follow/follow.module");
const prisma_module_1 = require("./prisma/prisma.module");
const file_module_1 = require("./file/file.module");
const post_module_1 = require("./post/post.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            user_module_1.UserModule,
            follow_module_1.FollowModule,
            prisma_module_1.PrismaModule,
            file_module_1.FileModule,
            post_module_1.PostModule,
        ],
        providers: [config_1.ConfigService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map