import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async createComment(
    @Req() req: Request,
    @Body() body: { content: string; postId: string },
    @Res() res: Response,
  ) {
    const userId = req.user['userId'];
    return await this.commentService.createComment(body, userId, res);
  }
}
