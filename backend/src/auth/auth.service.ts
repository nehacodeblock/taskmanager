import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new UnauthorizedException('invalid credentials password incorrect');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
