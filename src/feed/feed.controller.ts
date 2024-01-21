import { FeedService } from './feed.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedDto } from './dto/feed-dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/all')
  async getAllFeeds(@Res() res: Response) {
    return await this.feedService.getAllFeeds(res);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createFeed(
    @Req() req: Request,
    @Body() body: CreateFeedDto,
    @Res() res: Response,
  ) {
    return this.feedService.createFeed(body, req.user['userId'], res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  async deleteFeed() {
    return 'Delete Feed';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async updateFeed(
    @Req() req: Request,
    @Body() body: CreateFeedDto,
    @Res() res: Response,
  ) {
    const { id } = req.params;
    return await this.feedService.updateFeed(id, body, res);
  }
}
