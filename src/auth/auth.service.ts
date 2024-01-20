import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  register(createAuthDto: AuthUserDto) {
    const { email, password } = createAuthDto;
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  login(loginUser: AuthUserDto) {
    const { email, password } = loginUser;
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }
  }
}
