import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<Task | undefined> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: number,
    @Body() updatedTask: Task,
  ): Promise<Task | undefined> {
    return this.taskService.updateTask(id, updatedTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
