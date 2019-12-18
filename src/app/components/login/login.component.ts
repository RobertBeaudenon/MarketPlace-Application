import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        // console.log('From login' + data.token);
        this.tokenService.SetToken(data.token); //setting token in cookie for logged in users
        this.loginForm.reset(); //Reset form once login
        setTimeout(() => {
          this.router.navigate(['streams']); //If login successfull redirect user to component in path:streams (defined in streams-routing.module.ts)
        }, 3000);
      },
      err => {
        this.showSpinner = false;
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
