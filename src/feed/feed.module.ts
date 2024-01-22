import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { IsOwnerGuard } from './guard/IsOwner.guard';

@Module({
  controllers: [FeedController],
  providers: [FeedService, IsOwnerGuard],
})
export class FeedModule {}
