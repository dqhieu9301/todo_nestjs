import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDTO } from './dto/todo.dto';
import { ITodo, IStatus } from './interface/interface';
import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}
  
  async createTodo(todo: TodoDTO): Promise<IStatus>{
    const status = { message: "create success" };
    await this.todoRepository.save(todo);
    return status;
  }

  async getAllTodo(): Promise<ITodo[]> {
    return await this.todoRepository.find();
  }

  async deleteTodo(id: number): Promise<IStatus> {
    const status = { message: "delete success" };
    const todo = await this.todoRepository.findOne({ where: {id: id} });
    if(!todo) {
      throw new BadRequestException("Todo doesn't exits");
    }
    await this.todoRepository.delete(id);
    return status;
  }

  async updateTodo(id: number, todoUpdate: ITodo): Promise<IStatus> {
    const status = { message: "update success" };
    const { name, dateStart, dateEnd, isStatus } = todoUpdate;
    const todo = await this.todoRepository.findOne({ where: { id: id }});
    if(!todo) {
      throw new BadRequestException("Todo doesn't exits");
    }
    await this.todoRepository.update(id, { name, dateStart, dateEnd, isStatus });
    return status;
  }

}
