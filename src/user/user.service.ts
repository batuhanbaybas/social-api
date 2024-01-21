import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe() {
    return await this.prisma.user.findUnique({
      where: {
        id: '1',
      },
    });
  }
}
