import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.GetUsers();
  }

  GetUsers() {
    this.usersService.GetAllUsers().subscribe(data => {
      console.log(data);
      this.users = data.result;
    });
  }
}
