import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [
      { path: 'list', component: TaskListComponent },
      { path: 'add', component: TaskAddEditComponent },
      { path: 'edit/:id', component: TaskAddEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
