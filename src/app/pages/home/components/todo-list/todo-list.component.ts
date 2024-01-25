import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoModalComponent } from '../add-todo-modal/add-todo-modal.component';
import { Observable, catchError, from, of, switchMap } from 'rxjs';
import { TodoState } from 'src/app/core/services/todo-state';
import { Todo, TodoToCreate } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  todoList$: Observable<Todo[]>;

  constructor(
    private modalService: NgbModal,
    private todoState: TodoState
  ) {
    this.todoList$ = this.todoState.todoList$;
  }

  public openModal() {
    this.modalService
      .open(AddTodoModalComponent).closed
      .subscribe((res) => {
        this.addTodo(res);
      });
  }

  private addTodo(data: TodoToCreate) {
    this.todoState.onAddTodo(data);
  }

  public onDeleteTask(id: number) {
    this.todoState.onDeleteTodo(id);
  }

  public onToggleIsDone(data: any) {
    this.todoState.onUpdateTodo(data);
  }

}
