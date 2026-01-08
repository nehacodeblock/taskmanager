import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
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

  @Patch(':id')
  editTask(
    @Param('id') id: number,
    @Body() dto: CreateTaskDto,
    @Req() req: any,
  ) {
    return this.taskService.update(id, dto.title, req.user.id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number, @Req() req: any) {
    console.log(id, req.user.sub, req.user.id, '------delete');
    return this.taskService.delete(id, req.user.id);
  }
}
