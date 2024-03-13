import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  showErrorStatus: boolean = false;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.email, Validators.required]],
      Password: ['', [Validators.required]],
      Role: ['', Validators.required]
    })
  }
  closeErrorAlert() {
    this.showErrorStatus = false;
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  login() {
    debugger;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.user != null) {
          const user = {
            id: response.user.LoginId,
            role: response.user.Role
          };
          StorageService.saveUser(user);
          StorageService.saveToken(response.jwtToken);
          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin");
          } else if (StorageService.isUserLoggedIn()) {
            this.router.navigateByUrl("/userdash");
          }else if (StorageService.isOperatorLoggedIn()) {
            this.router.navigateByUrl("/navop");
          }
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.showErrorStatus = true;
        } else {
          console.error("Error occurred during login:", errorResponse.error);
        }
      }

    );
  }

}
