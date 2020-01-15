import { Component, OnInit } from '@angular/core';

import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment'; //For the format of the date on posts , moment is the variable that we can directly use
import _ from 'lodash';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-requesting',
  templateUrl: './requesting.component.html',
  styleUrls: ['./requesting.component.css']
})
export class RequestingComponent implements OnInit {
  btnElement: any;
  socket: any;
  user: any;
  posts = []; //initializing empty array\
  requestingIds = [];
  requests = [];

  post: string;

  constructor(
    private userService: UsersService,
    private postService: PostService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    //this.btnElement = document.querySelector('.card-action'); //selecting block of html using class name
    this.user = this.tokenService.GetPayload(); //retreiving the user object

    //will be called once
    this.GetUser();

    //will be called all the time
    this.socket.on('refreshPage', data => {
      this.GetUser();
    });
  }

  GetUser() {
    this.userService.GetUserByID(this.user._id).subscribe(
      data => {
        this.requestingIds = data.result.requesting.reverse();
        // console.log(data.result.requesting);
        this.GetPost();
      },
      err => console.log(err)
    );
  }

  GetPost() {
    this.requests = [];
    //console.log('GetPost');
    var i;
    for (i = 0; i < this.requestingIds.length; i++) {
      this.postService.getPost(this.requestingIds[i].postId).subscribe(data => {
        this.requests.push(data.post);
      });
    }
    // console.log('post: ' + this.requests.length);
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  CancelRequest(userRequested, postId) {
    this.postService.cancelRequest(userRequested, postId).subscribe(data => {
      // console.log(data);
      // _.remove(this.requests, { postId: postId });
      this.socket.emit('refresh', {});
    });
  }
  ViewUserProfile(user) {
    this.router.navigate([user.username]);
  }
}
