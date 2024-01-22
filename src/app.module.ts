import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';
import { CommentModule } from './comment/comment.module';
import { FriendModule } from './friend/friend.module';
import { FrinedService } from './frined/frined.service';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    FeedModule,
    CommentModule,
    FriendModule,
  ],
  providers: [FrinedService],
})
export class AppModule {}
