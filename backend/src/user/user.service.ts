import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async register(email: string, password: string) {
    const existingUser = await this.userRepo.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('email already exists');
    }

    const hPass = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      email,
      password: hPass,
    });
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    return user;
  }
}
