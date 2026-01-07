import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login-user.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(
      dto.email,
      dto.password,
    );
    res.cookie('token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      success: true,
      message: 'login successfully',
    };
  }
}
