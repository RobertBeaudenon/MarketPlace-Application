import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users = [];
  loggedInUser: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) {}

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload(); //get user info from payload
    this.GetUsers();
  }

  GetUsers() {
    this.usersService.GetAllUsers().subscribe(data => {
      _.remove(data.result, { username: this.loggedInUser.username }); //go into the array of object and remove the username that is loggedin
      this.users = data.result;
    });
  }
}
