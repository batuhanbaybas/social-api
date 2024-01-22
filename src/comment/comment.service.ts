import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(body: CreateCommentDto, userId: string, res: Response) {
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

  async updateComment(id: string, body: CreateCommentDto, res: Response) {
    const { content } = body;
    try {
      await this.prisma.comment.update({
        where: {
          id: id,
        },
        data: {
          content,
        },
      });
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Comment updated successfully',
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async deleteComment(id: string, res: Response) {
    try {
      await this.prisma.comment.delete({
        where: {
          id: id,
        },
      });
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Comment deleted successfully',
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
