import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskListComponent, TaskComponent, TaskAddEditComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TaskModule {}
