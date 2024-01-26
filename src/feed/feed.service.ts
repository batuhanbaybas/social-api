import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedDto } from './dto/feed-dto';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllFeeds() {
    try {
      const feeds = await this.prisma.feed.findMany({
        include: {
          owner: true,
        },
      });
      return {
        status: true,
        data: feeds,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async createFeed(
    feed: CreateFeedDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    const { title, content } = feed;
    try {
      await this.prisma.feed.create({
        data: {
          title,
          content,
          fileUrl: file.buffer.toString('base64'),
          ownerId: userId,
        },
      });
      return {
        status: true,
        message: 'Feed created successfully',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async updateFeed(id: string, body: CreateFeedDto) {
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
      return {
        status: true,
        message: 'Feed updated successfully',
      };
    } catch (error) {
      throw error.message;
    }
  }
  async deleteFeed(id: string) {
    try {
      await this.prisma.feed.delete({
        where: {
          id: id,
        },
      });
      return {
        status: true,
        message: 'Feed deleted successfully',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getFeedById(id: string) {
    try {
      const feed = await this.prisma.feed.findUnique({
        where: {
          id,
        },
        include: {
          owner: true,
          comments: {
            include: {
              owner: true,
            },
          },
        },
      });
      return {
        status: true,
        data: feed,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
