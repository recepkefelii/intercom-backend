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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const follow_service_1 = require("./follow.service");
const index_1 = require("../common/index");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    followRequest(id, user) {
        return this.followService.followUser(user, id);
    }
    userFollowers(user) {
        return this.followService.followers(user);
    }
    userFollowing(user) {
        return this.followService.following(user);
    }
};
__decorate([
    (0, common_1.Get)('follow/:id'),
    (0, common_1.UseGuards)(index_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, index_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "followRequest", null);
__decorate([
    (0, common_1.Get)('followers'),
    (0, common_1.UseGuards)(index_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(0, (0, index_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "userFollowers", null);
__decorate([
    (0, common_1.Get)('following'),
    (0, common_1.UseGuards)(index_1.AuthGuard),
    __param(0, (0, index_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "userFollowing", null);
FollowController = __decorate([
    (0, common_1.UseGuards)(index_1.AuthGuard),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
exports.FollowController = FollowController;
//# sourceMappingURL=follow.controller.js.map