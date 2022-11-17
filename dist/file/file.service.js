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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let FileService = class FileService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    saveFile(file, user) {
        const uuid = (0, uuid_1.v4)();
        const writeStream = (0, fs_1.createWriteStream)(`dist/images/${uuid.toString()}-${file.originalname}`);
        writeStream.write(file.buffer);
        if (file.size > 0) {
            const userPhotoUpdate = this.prismaService.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    ProfilPhotoPath: `http://localhost:8000/images/${uuid.toString()}-${file.originalname}`,
                },
            });
            return userPhotoUpdate;
        }
        return { Error: 'file not uploaded' };
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map