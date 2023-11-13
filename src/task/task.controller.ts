import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<{ status: string; data: Task[] }> {
    try {
      const tasks = await this.taskService.getAllTasks();
      return { status: '200', data: tasks || [] };
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error; // Rethrow the error to maintain the 500 status
    }
  }

  @Get(':id')
  async getTaskById(
    @Param('id') id: number,
    // ... other parameters if needed
  ): Promise<{ status: string; data: Task[] }> {
    try {
      const task = await this.taskService.getTaskById(id);
      return { status: '200', data: task ? [task] : [] };
    } catch (error) {
      console.error(`Error getting task with id ${id}:`, error);
      throw error; // Rethrow the error to maintain the 500 status
    }
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
  async updateTask(
    @Param('id') id: number,
    @Body() updatedTaskData: { name?: string; lastname?: string },
  ): Promise<Task | undefined> {
    try {
      // Ensure that at least one field is provided for update
      if (!updatedTaskData.name && !updatedTaskData.lastname) {
        throw new Error('error');
      }

      const existingTask = await this.taskService.getTaskById(id);

      if (!existingTask) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      // Update only the specified fields of the existing task
      if (updatedTaskData.name) {
        existingTask.name = updatedTaskData.name;
      }

      if (updatedTaskData.lastname) {
        existingTask.lastname = updatedTaskData.lastname;
      }

      const updatedTask = await this.taskService.updateTask(id, existingTask);

      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error; // Rethrow the error to maintain the 500 status
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.taskService.deleteTask(id);
      return { message: 'success' };
    } catch (error) {
      console.error(`Error deleting task with id ${id}:`, error);
      return { message: 'fail' };
    }
  }
}
