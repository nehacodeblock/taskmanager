import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  //Create Task
  create(title: string, userId: number) {
    return this.taskRepo.save({
      title,
      user: { id: userId },
    });
  }

  //get tasks of user
  findTaskByUser(userId: number) {
    return this.taskRepo.find({
      where: { user: { id: userId } },
    });
  }

  findAll() {
    return this.taskRepo.find();
  }
}
