import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ValidationMessageComponent],
  imports: [CommonModule, SharedRoutingModule, MatMenuModule, MatSidenavModule],
  exports: [
    HeaderComponent,
    SidebarComponent,
    MatMenuModule,
    MatSidenavModule,
    ValidationMessageComponent,
  ],
})
export class SharedModule {}
