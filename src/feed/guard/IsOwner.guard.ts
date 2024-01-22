// create the guard for the just update feed of the owner of the feed

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IsFeedOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const feedId = request.params.id;
    const userId = request.user['userId'];
    const feed = await this.prisma.feed.findFirst({
      where: {
        id: feedId,
        ownerId: userId,
      },
    });

    return feed && true;
  }
}
