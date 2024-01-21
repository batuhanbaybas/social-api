import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedDto } from './dto/feed-dto';

//TODO:(Batu) auth guard is ok but what if the different user tries to update the feed of other user ?
@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllFeeds(res: Response) {
    try {
      const feeds = await this.prisma.feed.findMany();
      res.status(HttpStatus.OK).json({
        status: true,
        data: feeds,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async createFeed(feed: CreateFeedDto, userId: string, res: Response) {
    const { title, content } = feed;
    try {
      await this.prisma.feed.create({
        data: {
          title,
          content,
          ownerId: userId,
        },
      });
      res.status(HttpStatus.CREATED).json({
        status: true,
        message: 'Feed created successfully',
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async updateFeed(id: string, body: CreateFeedDto, res: Response) {
    try {
      await this.prisma.feed.update({
        where: {
          id,
        },
        data: {
          ...body,
        },
      });
      res.status(HttpStatus.CREATED).json({
        status: true,
        message: 'Feed updated successfully',
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  async deleteFeed() {
    return 'Delete Feed';
  }
}
