import { FeedService } from './feed.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedDto } from './dto/feed-dto';
import { IsFeedOwnerGuard } from './guard/IsOwner.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async getAllFeeds() {
    return await this.feedService.getAllFeeds();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getFeedById(@Param() id: string) {
    const postId = id['id'];
    return await this.feedService.getFeedById(postId);
  }
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createFeed(
    @Req() req: Request,
    @Body() body: CreateFeedDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.feedService.createFeed(body, req.user['userId'], file);
  }

  @UseGuards(AuthGuard('jwt'), IsFeedOwnerGuard)
  @Delete('/delete/:id')
  async deleteFeed(@Param() params: { id: string }) {
    return await this.feedService.deleteFeed(params.id);
  }

  @UseGuards(AuthGuard('jwt'), IsFeedOwnerGuard)
  @HttpCode(HttpStatus.CREATED)
  @Put('/update/:id')
  async updateFeed(
    @Param() params: { id: string },
    @Body() body: CreateFeedDto,
  ) {
    const postId = params.id;
    return await this.feedService.updateFeed(postId, body);
  }
}
