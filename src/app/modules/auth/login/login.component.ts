import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UtilityService } from '../../shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private utility: UtilityService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  //submit login
  onSubmit() {
    this.utility.show();
    this.submitted = true;
    if (this.loginForm.valid) {
      const task = this.loginForm.value;
      this.authService.login(task).subscribe({
        next: () => {
          this.loginForm.reset();
          this.toastr.success('Logged in successfully.');
          this.router.navigateByUrl('/tasks/list');
          this.utility.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.message);
          this.utility.hide();
        },
      });
    }
  }
}
