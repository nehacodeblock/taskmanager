import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, title: string, userId: number) {
    const task = await this.taskRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('task not found ');
    }
    task.title = title;
    return this.taskRepo.save(task);
  }

  async delete(id: number, userId: number) {
    const result = await this.taskRepo.delete({ id, user: { id: userId } });

    if (result.affected === 0) {
      throw new NotFoundException('task not found ');
    }

    return { success: true };
  }
}
