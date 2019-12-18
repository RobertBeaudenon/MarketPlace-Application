import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //defining type of our form
  signupForm: FormGroup;
  errorMessage: string;

  //injecting the authService to be able to send data to the backend through it , fb for the formbuilder validations and ROuter to redirect to the desired component when registerd successfully
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.init();
  }

  //we initialize the form and set validators to each one in case user forget to specify a field
  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required], //each username,email,password is piped from the HTML using the "formControlName"
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  signupUser() {
    console.log(this.signupForm.value);
    //registerUser is the method defined in authService
    this.authService.registerUser(this.signupForm.value).subscribe(
      data => {
        console.log(data);
        this.signupForm.reset(); //Reset form once signup
        this.router.navigate(['streams']); //If signup successfull redirect user to component in path:streams (defined in streams-routing.module.ts)
      },
      err => {
        //2 different types of error messages
        //if doesn't match predefined schema
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }

        //if username/email already exist
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
