import { Component, inject } from '@angular/core';
import { AuthService } from './modules/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-manager';
  authService = inject(AuthService);
  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUser.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUser.set(null);
      }
    });
  }
}
