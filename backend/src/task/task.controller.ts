import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto, @Req() req: any) {
    return this.taskService.create(dto.title, req.user.id);
  }

  //   @Get()
  //   getTasks() {
  //     return this.taskService.findTaskByUser(1);
  //   }

  @Get()
  getTasks(@Req() req: any) {
    return this.taskService.findTaskByUser(req.user.id);
  }
}
