import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCardComponent {
  @Input() todo!: Todo;

  @Output() toggleIsDone = new EventEmitter<Todo>();
  @Output() deleteTask = new EventEmitter<number>();

  public onCheckboxChange() {
    const data = {
      id: this.todo.id,
      isDone: this.todo.isDone
    }
    this.toggleIsDone.emit(this.todo);
  }

  public onDelete() {
    this.deleteTask.emit(this.todo.id);
  }

  getTextColorClass() {
    if (!this.todo.taskDate) {
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    const currentDate = new Date(this.todo.taskDate);
    if (this.todo.taskDate < today) {
      return 'text-danger';
    } else if (this.todo.taskDate === today) {
      return 'text-warning';
    } else {
      return 'text-black-50';
    }
  }
}
