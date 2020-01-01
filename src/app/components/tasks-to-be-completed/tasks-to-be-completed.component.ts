import { Component, OnInit } from '@angular/core';

import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment'; //For the format of the date on posts , moment is the variable that we can directly use
import _ from 'lodash';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tasks-to-be-completed',
  templateUrl: './tasks-to-be-completed.component.html',
  styleUrls: ['./tasks-to-be-completed.component.css']
})
export class TasksToBeCompletedComponent implements OnInit {
  btnElement: any;
  socket: any;
  user: any;
  posts = []; //initializing empty array\
  requestersIds = [];
  tasks = [];
  tasksToDo = [];
  usersDoingTaskName = [];
  usersDoingTaskId = [];

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
    this.usersDoingTaskName = [];
    this.usersDoingTaskId = [];
    this.userService.GetUserByID(this.user._id).subscribe(
      data => {
        this.tasks = data.result.tasks.reverse();
        //Removing tasks that i'm not assigned to
        var i = 0;
        while (i < this.tasks.length) {
          if (this.tasks[i].username !== this.user.username) {
            this.tasks.splice(i, 1);
          }
          i++;
        }

        this.tasksToDo = this.tasks;
      },
      err => console.log(err)
    );
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  CompleteTask(userRequested, username, postId) {
    this.postService.cancelApplication(userRequested, username, postId).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }
}
