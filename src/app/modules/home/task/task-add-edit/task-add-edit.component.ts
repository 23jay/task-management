import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Task, TaskService } from '../../../shared/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private utility: UtilityService,
    private toastr: ToastrService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['To Do', Validators.required],
    });
  }

  ngOnInit() {
    this.utility.show();
    // Get the task update id and patch the value for particular task
    this.route.params.subscribe((res) => {
      this.editId = res['id'];
      this.taskService.getTasksById(this.editId).subscribe({
        next: (response) => {
          if (response) {
            this.taskForm.patchValue(response);
          }
          this.utility.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.message);
          this.utility.hide();
        },
      });
    });
  }

  // manage task add/edit based on the edit id
  async onSubmit() {
    this.submitted = true;
    this.utility.show();
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      let url: any = this.editId
        ? this.taskService.updateTask(task, this.editId)
        : this.taskService.addTask(task);
      await url
        .then(() => {
          this.toastr.success(
            this.editId
              ? 'Task updated successfully.'
              : 'Task added successfully.'
          );
          this.submitted = false;
          this.router.navigateByUrl('/tasks/list');
          this.taskForm.reset({ status: 'To Do' });
          this.utility.hide();
        })
        .catch((error: any) => {
          this.submitted = false;
          this.toastr.error(error.message);
          this.utility.hide();
        });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.taskForm.controls;
  }
}
