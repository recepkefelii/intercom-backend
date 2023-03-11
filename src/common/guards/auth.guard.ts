import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        request['user'] = this.validateToken(request.headers.authorization);

        return true;
    }

    validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        const token = auth.split(' ')[1];

        const decoded = this.verifyToken(token);

        return decoded;
    }

    verifyToken(token: string) {
        const secret = this.config.getOrThrow<string>("JWT_SECRET_KEY")
        return this.jwtService.verify(token, { secret });
    }

}