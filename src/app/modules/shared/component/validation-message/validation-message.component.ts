import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
})
export class ValidationMessageComponent {
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string | null {
    if (this.control && this.control.errors) {
      for (const key in this.control.errors) {
        if (this.control.errors.hasOwnProperty(key)) {
          switch (key) {
            case 'required':
              return 'This field is required';
            case 'minlength':
              return `Minimum length is ${this.control.errors['minlength'].requiredLength}`;
            case 'maxlength':
              return `Maximum length is ${this.control.errors['maxlength'].requiredLength}`;
            case 'email':
              return 'Invalid email format';
          }
        }
      }
    }
    return null;
  }
}
