import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../global/constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navigationItems = navItems;
  constructor(public router: Router) {}
}
