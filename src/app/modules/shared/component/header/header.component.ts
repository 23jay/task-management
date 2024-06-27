import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName: string | undefined;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.userName = this.authService.currentUser()?.username;
  }
  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
