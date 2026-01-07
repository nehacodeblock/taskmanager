import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto.email, dto.password);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
