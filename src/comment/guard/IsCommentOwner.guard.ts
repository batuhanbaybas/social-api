import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ISCommentOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const commentId = request.params.id;
    const userId = request.user['userId'];
    const comment = await this.prisma.comment.findFirst({
      where: {
        id: commentId,
        userId: userId,
      },
    });

    return comment && true;
  }
}
