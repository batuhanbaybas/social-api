import { FeedService } from './feed.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedDto } from './dto/feed-dto';
import { IsFeedOwnerGuard } from './guard/IsOwner.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/all')
  async getAllFeeds(@Res() res: Response) {
    return await this.feedService.getAllFeeds(res);
  }

  @Get('/:id')
  async getFeedById(@Param() id: string, @Res() res: Response) {
    const postId = id['id'];
    return await this.feedService.getFeedById(postId, res);
  }
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('/create')
  async createFeed(
    @Req() req: Request,
    @Body() body: CreateFeedDto,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.feedService.createFeed(
      body,
      req.user['userId'],
      file,
      res,
    );
  }

  @UseGuards(AuthGuard('jwt'), IsFeedOwnerGuard)
  @Delete('/delete/:id')
  async deleteFeed(@Param() params: { id: string }, @Res() res: Response) {
    return await this.feedService.deleteFeed(params.id, res);
  }

  @UseGuards(AuthGuard('jwt'), IsFeedOwnerGuard)
  @Put('/update/:id')
  async updateFeed(
    @Param() params: { id: string },
    @Body() body: CreateFeedDto,
    @Res() res: Response,
  ) {
    const postId = params.id;
    return await this.feedService.updateFeed(postId, body, res);
  }
}
