import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserDto } from './dto/auth.dto';
import { hashPassword, verifyPassword } from 'src/helper/hasher';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async register(createAuthDto: AuthUserDto) {
    const { email, password } = createAuthDto;
    const hashedPassword = await hashPassword(password);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return await this.signToken(user.id, user.email);
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

    return await this.signToken(user.id, user.email);
  }

  async signToken(userID: string, email: string) {
    const payload = { username: email, sub: userID };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.config.get<string>('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
