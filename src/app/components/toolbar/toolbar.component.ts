import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;
  notifications = [];
  socket: any;

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.GetUser();

    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
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

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  //Mark all notifications as read
  MarkAll() {
    this.usersService.MarkAllAsRead().subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    });
  }
}
