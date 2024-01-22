// create the guard for the just update feed of the owner of the feed

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

//TODO:(Batu) has some problem with the guard injection not working
export class IsOwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
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
    if (feed.ownerId === userId) {
      return true;
    }

    throw new ForbiddenException('You are not the owner of the feed');
  }
}
