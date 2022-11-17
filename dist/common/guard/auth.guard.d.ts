import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AuthGuard implements CanActivate {
    private readonly config;
    constructor(config: ConfigService);
    canActivate(context: ExecutionContext): boolean;
    validateToken(auth: string): string | import("jsonwebtoken").JwtPayload;
    verifyToken(token: string): string | import("jsonwebtoken").JwtPayload;
}
