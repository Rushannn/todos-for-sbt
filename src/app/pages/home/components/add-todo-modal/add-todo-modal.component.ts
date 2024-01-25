import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoToCreate } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss']
})
export class AddTodoModalComponent {
  taskName: string = '';
  taskDate: string = '';
  minDate: string;


  newTodoData: TodoToCreate | undefined;

  constructor(public activeModal: NgbActiveModal) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  closeModal() {
    this.activeModal.close(null);
  }

  saveTask() {
    this.newTodoData = {
      taskName: this.taskName,
      taskDate: this.taskDate,
      isDone: false
    };
    this.activeModal.close(this.newTodoData);
  }
}

