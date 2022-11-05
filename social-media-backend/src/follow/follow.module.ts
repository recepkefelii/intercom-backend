import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { FallowEntity } from 'src/entities/follow.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity,FallowEntity])],
  controllers: [FollowController],
  providers: [FollowService,],
  exports:[FollowService]
})
export class FollowModule {}
