import { Component } from '@angular/core';
import { Task, TaskService } from '../../../shared/services/task.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskList: any = [];
  filteredTasks: Task[] = [];
  paginatedTasks: Task[] = [];
  filter: string = 'All';
  searchString!: string;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private utility: UtilityService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getTaskList();
  }

  // Get the task list
  getTaskList() {
    this.utility.show();
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.taskList = response;
        this.applyFilter();
        this.utility.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.message);
        this.utility.hide();
      },
    });
  }

  // Delete task
  deleteTask(data: any) {
    this.utility.show();
    this.taskService.deleteTask(data.id).then(
      (response: any) => {
        if (response) {
          this.toastr.success('Task deleted successfully.');
          // Find the index of the task with the matching id in taskList
          const index = this.paginatedTasks.findIndex(
            (task: any) => task.id === data.id
          );
          // Remove the task from taskList if found
          if (index !== -1) {
            this.paginatedTasks.splice(index, 1);
          }
        }
        this.utility.hide();
      },
      (err: any) => {
        this.toastr.error(err.message);
        this.utility.hide();
      }
    );
  }

  // Task update
  updateTask(data: any) {
    this.router.navigateByUrl('/tasks/edit/' + data.id);
  }

  applyFilter() {
    this.utility.show();
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
    // Reset current page to 1 when filter or search is applied
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    this.paginateTasks();
    this.utility.hide();
  }

  // Filter by status
  onFilterChange(newFilter: any) {
    this.filter = newFilter.target.value;
    this.applyFilter();
  }

  // Search by task name
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchString = inputElement.value;
    this.applyFilter();
  }

  async updateTaskStatus(task: any) {
    this.utility.show();
    await this.taskService
      .updateTask(task, task.id)
      .then(() => {
        this.toastr.success('Task status updated successfully.');
        this.utility.hide();
      })
      .catch((error) => {
        this.toastr.error(error.message);
        this.utility.hide();
      });
  }

  paginateTasks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  // Pagination methods
  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginateTasks();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateTasks();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateTasks();
    }
  }
}
