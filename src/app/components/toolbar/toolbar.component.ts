import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { arrayAverage } from '../../../assets/js/helpers.js';
import { StarRatingComponent } from 'ng-starrating';
import { MessageService } from 'src/app/services/message.service.js';

declare var $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  //to send data from toolbar component to chat compoenent
  @Output() onlineUsers = new EventEmitter();

  user: any;
  notifications = [];
  socket: any;
  count = [];
  average: any;
  chatList = [];
  msgNumber = 0;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private usersService: UsersService,
    private msgService: MessageService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    const dropDownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    const dropDownElementTwo = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropDownElementTwo, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.socket.emit('online', { room: 'global', user: this.user.username });

    this.GetUser();
    this.average = arrayAverage(this.user.ratingNumber);
    this.average = Math.round(this.average);

    this.socket.on('refreshPage', () => {
      this.GetUser();
      this.average = arrayAverage(this.user.ratingNumber);
      this.average = Math.round(this.average);
    });
  }

  ngAfterViewInit() {
    //listen for the usersonline event, will return an array of the names of the users that are online
    this.socket.on('usersOnline', data => {
      //console.log(data);
      //emit is not from socket in that case but for the transfer of data between components
      this.onlineUsers.emit(data);
    });
  }

  /****TO LOGOUT*****/
  logout() {
    this.tokenService.DeleteToken(); //Delete token when user logout
    this.router.navigate(['']); //redirect user to login/register pager

    this.socket.disconnect(); //remove user from list of online users
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
        this.chatList = data.result.chatList;
        this.CheckIfLastMessageIsRead(this.chatList);
        //console.log(this.msgNumber);
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

  MessageDate(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      SameElse: 'DD/MM/YYYY'
    });
  }

  CheckIfLastMessageIsRead(arr) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      //get last message for each user
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];

      //If the user has not the chatbox opened then we display a notification else we don't
      if (this.router.url !== `/chat/${receiver.sendername}`) {
        if (receiver.isRead === false && receiver.receiverName === this.user.username) {
          //to update the notification counter of unread messages
          checkArr.push(1);
          this.msgNumber = _.sum(checkArr);
        }
      }
    }
  }

  GoToChatPage(name) {
    this.router.navigate(['chat', name]);
    this.msgService.MarkMessages(this.user.username, name).subscribe(data => {
      // console.log(data);
      this.socket.emit('refresh', {});
    });
  }

  MarkAllMessages() {
    //console.log('asdfghjk');
    this.msgService.MarkAllMessages().subscribe(data => {});
    this.socket.emit('refresh', {});
    this.msgNumber = 0;
  }
}
