import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserDto } from './dto/auth.dto';
import { hashPassword, verifyPassword } from 'src/helper/hasher';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async register(createAuthDto: AuthUserDto) {
    const { email, password } = createAuthDto;
    const hashedPassword = await hashPassword(password);
    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
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
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }
  }
}
