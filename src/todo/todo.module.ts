import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../entity/todo.entity';
import { Token } from '../entity/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Token])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
