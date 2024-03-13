import { Component } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, MaxLengthValidator, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  customerForm: FormGroup;
  registrationError: string;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
console.log("customer form");
    this.customerForm = this.fb.group({
      Name: ['', Validators.required],
      Gender: ['', Validators.required],
      ContactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      RePassword: ['', [Validators.required, Validators.minLength(6)]],                
      Role: [''] 
    },
      {
        validators: this.passwordMatchValidator 
      }
    );
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }
  roleCheckValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const role = control.value;
      if (role && role.toLowerCase() !== 'user') {
        return { 'invalidRole': true };
      }
      console.log("role check ");
      return null;
    };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('Password');
    const confirmPassword = control.get('RePassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      // Clear error if passwords match
      confirmPassword.setErrors(null);
      console.log("Password is cleared");
      return null;
    }
  }

  register() {
   console.log("Register bracket");
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      formData.Role = 'User';
      console.log("Form validity:", this.customerForm.valid);
console.log("Name validity:", this.customerForm.get('Name').valid);
console.log("Email validity:", this.customerForm.get('Email').valid);
console.log("Form errors:", this.customerForm.errors);
console.log("Name errors:", this.customerForm.get('Name').errors);
console.log("Email errors:", this.customerForm.get('Email').errors);
      this.authService.register(formData).subscribe(
        (response) => {
          alert("Registered successfully");
          this.customerForm.reset();
          this.router.navigateByUrl("/login");
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            if (error.error === "Customer with the same CustomerId already exists." || error.error === "Email Already Registered.") {
              alert("You are already registered.");
            } 
          } else {
            alert("An error occurred during registration.");
          }
        }
      );
    } else {
      alert("Invalid form");
    }
  }
  




}
