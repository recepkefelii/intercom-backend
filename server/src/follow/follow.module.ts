import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [],
  controllers: [FollowController],
  providers: [FollowService,],
  exports:[FollowService]
})
export class FollowModule {}

