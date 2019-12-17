import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //injecting the authService to be able to send data to the backend through it
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signupUser() {
    //registerUser is the method defined in authService
    this.authService.registerUser('test').subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
}
