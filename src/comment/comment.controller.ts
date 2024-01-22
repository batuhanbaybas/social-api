import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async createComment(
    @Req() req: Request,
    @Body() body: CreateCommentDto,
    @Res() res: Response,
  ) {
    const userId = req.user['userId'];
    return await this.commentService.createComment(body, userId, res);
  }
}
