"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (typeof data === 'string') {
        return request.user[data];
    }
    delete request.user.password;
    delete request.user.iat;
    return request.user;
});
//# sourceMappingURL=get-user.decorator.js.map