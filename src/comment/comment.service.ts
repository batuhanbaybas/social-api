import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(body: CreateCommentDto, userId: string) {
    const { content, postId } = body;
    try {
      await this.prisma.comment.create({
        data: {
          content,
          feedId: postId,
          userId,
        },
      });

      return {
        status: true,
        message: 'Comment created successfully',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async updateComment(id: string, body: CreateCommentDto) {
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
      return {
        status: true,
        message: 'Comment updated successfully',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async deleteComment(id: string) {
    try {
      await this.prisma.comment.delete({
        where: {
          id: id,
        },
      });
      return {
        status: true,
        message: 'Comment deleted successfully',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
