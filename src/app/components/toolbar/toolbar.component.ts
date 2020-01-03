import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { arrayAverage } from '../../../assets/js/helpers.js';
import { StarRatingComponent } from 'ng-starrating';

declare var $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;
  notifications = [];
  socket: any;
  count = [];
  average: any;

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
    this.average = arrayAverage(this.user.ratingNumber);

    this.socket.on('refreshPage', () => {
      this.GetUser();
      this.average = arrayAverage(this.user.ratingNumber);
    });

    // $(document).ready(function() {
    //   $.fn.raty.defaults.path = '../../../assets/images/';
    //   $('.star').raty({
    //     readOnly: true,
    //     score: function(data) {
    //       return $(this).attr('data-score');
    //     }
    //   });
    // });
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
    this.usersService.GetUserByID(this.user._id).subscribe(
      data => {
        this.notifications = data.result.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]); //check in notificatins how many are not read
        this.count = value;
      },
      err => {
        if (err.error.token === null) {
          //When token is expired we set the token to null in the backend(helpers/authHelper)
          this.tokenService.DeleteToken();
          this.router.navigate(['']); //redirect us to login page
        }
      }
    );
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  //Mark all notifications as read
  MarkAll() {
    this.usersService.MarkAllAsRead().subscribe(data => {
      // console.log(data);
      this.socket.emit('refresh', {});
    });
  }

  //to display rating of user
  onRate($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
}
