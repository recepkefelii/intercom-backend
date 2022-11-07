import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserInfo } from './interface/index';

@Injectable()
export class FollowService {
    
    constructor(private readonly prismaService: PrismaService) {}

    follow(user:IUserInfo):any {
        
    }

}
