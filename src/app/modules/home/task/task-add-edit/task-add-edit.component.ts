import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Task, TaskService } from '../../../shared/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrl: './task-add-edit.component.scss',
})
export class TaskAddEditComponent {
  taskForm: FormGroup;
  submitted = false;
  editId!: string;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['To Do', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.editId = res['id'];
      this.taskService.getTasksById(this.editId).subscribe({
        next: (response) => {
          if (response) {
            this.taskForm.patchValue(response);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      let url: any = this.editId
        ? this.taskService.updateTask(task ,this.editId)
        : this.taskService.addTask(task);
      url.then(() => {
        this.taskForm.reset({ status: 'To Do' });
        this.router.navigateByUrl('/tasks/list');
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.taskForm.controls;
  }
}
