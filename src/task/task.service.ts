import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    const options: FindOneOptions<Task> = { where: { id } };
    return this.taskRepository.findOne(options);
  }

  async createTask(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, updatedTask: Task): Promise<Task | undefined> {
    const existingTask = await this.getTaskById(id);

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    // Update only the specified fields of the existing task
    this.taskRepository.merge(existingTask, updatedTask);

    return this.taskRepository.save(existingTask);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
