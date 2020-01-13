import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users = [];
  loggedInUser: any;
  userArr = [];
  onlineusers = [];

  constructor(private usersService: UsersService, private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload(); //get user info from payload
    this.GetUsers();
    this.GetUsers();
  }

  GetUsers() {
    this.usersService.GetAllUsers().subscribe(data => {
      _.remove(data.result, { username: this.loggedInUser.username }); //go into the array of object and remove the username that is loggedin
      this.users = data.result;
    });
  }

  GetUser() {
    this.usersService.GetUserByID(this.loggedInUser._id).subscribe(data => {
      console.log(data);
    });
  }

  online(event) {
    this.onlineusers = event;
  }

  CheckIfOnline(name) {
    const result = _.indexOf(this.onlineusers, name);

    if (result > -1) {
      return true;
    } else {
      return false;
    }
  }

  ViewUserProfile(user) {
    this.router.navigate([user.username]);
  }
}
