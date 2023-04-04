import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Put, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './dto/todo.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(
        private readonly todoService: TodoService
  ) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async create(@Body() todoDTO: TodoDTO, ) {
    return await this.todoService.createTodo(todoDTO);
  }

  @Get('/getAll')
  async getAll() {
    return await this.todoService.getAllTodo();
  }

  @Delete('/delete/:id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.deleteTodo(id);
  }

  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() todoUpdate: TodoDTO) {
    return await this.todoService.updateTodo(id, todoUpdate);
  }

}
