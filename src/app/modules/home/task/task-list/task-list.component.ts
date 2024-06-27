import { Component } from '@angular/core';
import { Task, TaskService } from '../../../shared/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskList: any = [];
  filteredTasks: Task[] = [];
  filter: string = 'All';
  searchString!: string;
  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit() {
    this.getTaskList();
  }
  getTaskList() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.taskList = response;
        this.applyFilter();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteTask(data: any) {
    this.taskService.deleteTask(data.id).then(
      (response: any) => {
        if (response) {
          this.getTaskList();
        }
        this.getTaskList();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  updateTask(data: any) {
    this.router.navigateByUrl('/tasks/edit/' + data.id);
  }

  applyFilter() {
    let tasks = this.taskList;

    if (this.filter !== 'All') {
      tasks = tasks.filter((task: any) => task.status === this.filter);
    }

    if (this.searchString) {
      tasks = tasks.filter((task: any) =>
        task.title.toLowerCase().includes(this.searchString.toLowerCase())
      );
    }

    this.filteredTasks = tasks;
  }

  onFilterChange(newFilter: any) {
    this.filter = newFilter.target.value;
    this.applyFilter();
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchString = inputElement.value;
    this.applyFilter();
  }
}
