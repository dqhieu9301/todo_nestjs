import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDTO } from './dto/todo.dto';
import { ITodo, IStatus } from './interface/interface';
import { Todo } from '../entity/todo.entity';
import { IPayloadUser } from '../user/interface/interface';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}
  
  async createTodo(todo: TodoDTO, user: any): Promise<IStatus>{
    const status = { message: "create success" };
    const saveTodo = {
      ...todo, 
      idUser: user.id,
      isDelete: false
    };
    await this.todoRepository.save(saveTodo);
    return status;
  }

  async getAllTodo(user: IPayloadUser): Promise<ITodo[]> {
    const listTodo = await this.todoRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.dateStart', 'user.dateEnd', 'user.isStatus'])
      .where({ idUser: user.id, isDelete: false })
      .getMany();
    return listTodo;
  }

  async deleteTodo(id: number, user: IPayloadUser): Promise<IStatus> {
    const status = { message: "delete success" };
    const todo = await this.todoRepository.findOne({ where: {id: id, idUser: user.id, isDelete: false } });
    if(!todo) {
      throw new BadRequestException("Todo doesn't exits");
    }
    await this.todoRepository.update({ id: id, idUser: user.id, isDelete: false }, { isDelete: true });
    return status;
  }

  async updateTodo(id: number, todoUpdate: ITodo, user: IPayloadUser): Promise<IStatus> {
    const status = { message: "update success" };
    const { name, dateStart, dateEnd, isStatus } = todoUpdate;
    const todo = await this.todoRepository.findOne({ where: { id: id, idUser: user.id, isDelete: false }});
    if(!todo) {
      throw new BadRequestException("Todo doesn't exits");
    }
    await this.todoRepository.update({id: id, idUser: user.id, isDelete: false }, { name, dateStart, dateEnd, isStatus });
    return status;
  }

}
