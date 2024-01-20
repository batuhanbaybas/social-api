import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() registerUser: AuthUserDto) {
    return this.authService.register(registerUser);
  }

  @Post()
  login(@Body() loginUser: AuthUserDto) {
    return this.authService.login(loginUser);
  }
}
