import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() registerUser: AuthUserDto) {
    return await this.authService.register(registerUser);
  }

  @Post()
  async login(@Body() loginUser: AuthUserDto) {
    return await this.authService.login(loginUser);
  }
}
