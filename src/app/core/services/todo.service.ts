import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Todo, TodoToCreate } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private url = '/todo1';

  constructor(
    private apiService: ApiService
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.apiService.get<Todo[]>(this.url);
  }

  addTodo(newTodo: TodoToCreate): Observable<Todo> {
    return this.apiService.post<Todo, TodoToCreate>(this.url, newTodo)
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.apiService.patch<Todo, Todo>(`${this.url}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<{}> {
    return this.apiService.delete(`${this.url}/${id}`);
  }
}

