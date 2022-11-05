import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { UserFolllowDto } from './dto';
import { FallowEntity } from 'src/entities/follow.entity';
import { Repository } from 'typeorm/repository/Repository';
import { FollowRequest } from './interface/follow.interface';
import { UserEntity } from 'src/entities';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    @InjectRepository(FallowEntity)
    private readonly followRepository: Repository<FallowEntity>;

    
    
    

}
