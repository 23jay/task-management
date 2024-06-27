import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksCollection = this.afs.collection<Task>('tasks');

  constructor(private afs: AngularFirestore) {}

  getTasks(): Observable<Task[]> {
    return this.tasksCollection.valueChanges({ idField: 'id' });
  }

  getTasksById(id: string): Observable<Task | undefined> {
    return this.tasksCollection.doc(id).valueChanges();
  }

  addTask(task: Task) {
    return this.tasksCollection.add(task);
  }

  updateTask(task: Task, id: string) {
    return this.tasksCollection.doc(id).update(task);
  }

  deleteTask(taskId: string) {
    return this.tasksCollection.doc(taskId).delete();
  }
}
