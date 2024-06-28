import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private utility: UtilityService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  //submit sign up
  onSubmit() {
    this.utility.show();
    this.submitted = true;
    if (this.signupForm.valid) {
      const task = this.signupForm.value;
      this.authService.signup(task).subscribe({
        next: () => {
          this.signupForm.reset();
          this.toastr.success('Sign up successfully.');
          this.router.navigateByUrl('/');
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
