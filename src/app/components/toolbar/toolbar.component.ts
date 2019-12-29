import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;
  notifications = [];

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) {}

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.GetUser();
  }

  /****TO LOGOUT*****/
  logout() {
    this.tokenService.DeleteToken(); //Delete token when user logout
    this.router.navigate(['']); //redirect user to login/register pager
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  //display notifications
  GetUser() {
    this.usersService.GetUserByID(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();
    });
  }
}
