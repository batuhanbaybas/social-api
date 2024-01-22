import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ISCommentOwnerGuard } from './guard/IsCommentOwner.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createComment(
    @Req() req: Request,
    @Body() body: CreateCommentDto,
    @Res() res: Response,
  ) {
    const userId = req.user['userId'];
    return await this.commentService.createComment(body, userId, res);
  }

  @UseGuards(AuthGuard('jwt'), ISCommentOwnerGuard)
  @Put('update/:id')
  async updateComment(
    @Param() params: { id: string },
    @Body() body: CreateCommentDto,
    @Res() res: Response,
  ) {
    const commentId = params.id;
    return await this.commentService.updateComment(commentId, body, res);
  }

  @UseGuards(AuthGuard('jwt'), ISCommentOwnerGuard)
  @Delete('delete/:id')
  async deleteComment(@Param() params: { id: string }, @Res() res: Response) {
    const commentId = params.id;
    return await this.commentService.deleteComment(commentId, res);
  }
}
