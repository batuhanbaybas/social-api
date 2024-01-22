import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { IsFeedOwnerGuard } from './guard/IsOwner.guard';

@Module({
  controllers: [FeedController],
  providers: [FeedService, IsFeedOwnerGuard],
})
export class FeedModule {}
