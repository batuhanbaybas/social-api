import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async register(createAuthDto: AuthUserDto) {
    const { email, password } = createAuthDto;
    return await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async login(loginUser: AuthUserDto) {
    const { email, password } = loginUser;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    if (user.password !== password) {
      throw new ForbiddenException('Invalid credentials');
    }
  }
}
