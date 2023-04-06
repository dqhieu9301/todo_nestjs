import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Put, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './dto/todo.dto';
import { AuthGuard } from '../auth/auth.guard';
import { TodoUpdateDTO } from './dto/todoUpdate.dto';
import { IPayloadUser } from '../user/interface/interface';

@Controller('api/todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(
        private readonly todoService: TodoService
  ) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async create(@Body() todoDTO: TodoDTO,@Req() request: { user: IPayloadUser }) {
    return await this.todoService.createTodo(todoDTO, request.user);
  }

  @Get('/getAll')
  async getAll(@Req() request: { user: IPayloadUser}) {
    return await this.todoService.getAllTodo(request.user);
  }

  @Delete('/delete/:id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number, @Req() request: { user: IPayloadUser }) {
    return await this.todoService.deleteTodo(id, request.user);
  }

  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() todoUpdate: TodoUpdateDTO, @Req() request: { user: IPayloadUser }) {
    return await this.todoService.updateTodo(id, todoUpdate, request.user);
  }

}
