import { DestroyRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Todo, TodoToCreate } from '../models/todo.model';
import { TodoServiceService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoState {

  private todoListSubject = new BehaviorSubject<Todo[]>([]);
  public todoList$ = this.todoListSubject.asObservable();

  private destroyRef = inject(DestroyRef);

  constructor(
    private todoService: TodoServiceService
  ) {
    this.getTodoList();
  }

  private getTodoList() {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      const todoList = JSON.parse(storedTodoList);
      this.todoListSubject.next(todoList);
    }
    this.todoService.getTodos()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.todoListSubject.next(data);
          localStorage.setItem('todoList', JSON.stringify(data));
        },
        error: (err) => {
          console.error('Error fetching todo list', err);
        }
      });
  }


  public onAddTodo(newTodo: TodoToCreate) {
    this.todoService.addTodo(newTodo)
      .pipe(take(1))
      .subscribe({
        next: (todo) => {
          this.addTodo(todo);
        },
        error: err => console.log('Error adding todo', err)
      })
  }

  public onDeleteTodo(id: number) {
    this.todoService.deleteTodo(id)
      .pipe(take(1))
      .subscribe({
        next: (todo) => {
          this.removeTodo(id);
        },
        error: err => console.log('Error adding todo', err)
      })
  }

  public onUpdateTodo(todo: Todo) {
    this.todoService.updateTodo(todo)
      .pipe(take(1))
      .subscribe({
        next: (todo) => {
          this.updateTodo(todo);
        },
        error: err => console.log('Error adding todo', err)
      })
  }

  private addTodo(newTodo: Todo) {
    const currentTodos = this.todoListSubject.getValue();
    const updatedTodos = [...currentTodos, newTodo];
    this.todoListSubject.next(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));
  }

  private removeTodo(id: number) {
    const currentTodos = this.todoListSubject.getValue();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.todoListSubject.next(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));
  }

  private updateTodo(todo: Todo) {
    const currentTodos = this.todoListSubject.getValue();
    const updatedTodos = currentTodos.map(item => {
      if (item.id === todo.id) {
        return todo;
      }
      return item;
    });
    this.todoListSubject.next(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));
  }
}


