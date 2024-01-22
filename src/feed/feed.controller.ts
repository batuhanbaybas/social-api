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
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedDto } from './dto/feed-dto';
import { IsOwnerGuard } from './guard/IsOwner.guard';

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
  @Post('/create')
  async createFeed(
    @Req() req: Request,
    @Body() body: CreateFeedDto,
    @Res() res: Response,
  ) {
    return await this.feedService.createFeed(body, req.user['userId'], res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  async deleteFeed() {
    return 'Delete Feed';
  }

  @UseGuards(AuthGuard('jwt'), IsOwnerGuard)
  @Put('/update/:id')
  async updateFeed(
    @Param() id: string,
    @Body() body: CreateFeedDto,
    @Res() res: Response,
  ) {
    const postId = id['id'];
    return await this.feedService.updateFeed(postId, body, res);
  }
}
