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
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<Task | undefined> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(
    @Body() taskData: { name: string; lastname: string },
  ): Promise<Task> {
    console.log('Received data:', taskData);
    try {
      if (!taskData.name) {
        throw new Error('Name is required.'); // Throw an error if 'name' is not provided
      }

      const task: Task = {
        id: undefined,
        name: taskData.name,
        lastname: taskData.lastname,
      };

      const createdTask = await this.taskService.createTask(task);
      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error; // Rethrow the error to maintain the 500 status
    }
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
