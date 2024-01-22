import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(
    body: { content: string; postId: string },
    userId: string,
    res: Response,
  ) {
    const { content, postId } = body;
    try {
      await this.prisma.comment.create({
        data: {
          content,
          feedId: postId,
          userId,
        },
      });

      res.status(HttpStatus.CREATED).json({
        status: true,
        message: 'Comment created successfully',
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
