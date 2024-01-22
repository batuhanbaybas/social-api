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

  async updateFeed(id: string, body: any, res: Response) {
    const { title, content } = body;
    try {
      await this.prisma.feed.update({
        where: {
          id: id,
        },
        data: {
          title,
          content,
        },
      });
      return res.status(HttpStatus.CREATED).json({
        status: true,
        message: 'Feed updated successfully',
      });
    } catch (error) {
      throw error.message;
    }
  }
  async deleteFeed() {
    return 'Delete Feed';
  }

  async getFeedById(id: string, res?: Response) {
    try {
      const feed = await this.prisma.feed.findUnique({
        where: {
          id,
        },
      });
      return res.status(HttpStatus.OK).json({
        status: true,
        data: feed,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}