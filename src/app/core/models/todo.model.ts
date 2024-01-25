export interface Todo {
  id: number;
  taskName: string;
  taskDate?: string;
  isDone: boolean;
}

export interface TodoToCreate {
  taskName: string;
  taskDate?: string;
  isDone: boolean;
}
