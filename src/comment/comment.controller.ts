import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ISCommentOwnerGuard } from './guard/IsCommentOwner.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createComment(@Req() req: Request, @Body() body: CreateCommentDto) {
    const userId = req.user['userId'];
    return await this.commentService.createComment(body, userId);
  }

  @UseGuards(AuthGuard('jwt'), ISCommentOwnerGuard)
  @HttpCode(HttpStatus.CREATED)
  @Put('update/:id')
  async updateComment(
    @Param() params: { id: string },
    @Body() body: CreateCommentDto,
  ) {
    const commentId = params.id;
    return await this.commentService.updateComment(commentId, body);
  }

  @UseGuards(AuthGuard('jwt'), ISCommentOwnerGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async deleteComment(@Param() params: { id: string }) {
    const commentId = params.id;
    return await this.commentService.deleteComment(commentId);
  }
}
