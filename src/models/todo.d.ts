export interface Todo {
  task: string;
  dueDate: Date;
  ownerId: number;
  status?: number;
}
