import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment'; //For the format of the date on posts , moment is the variable that we can directly use
import _ from 'lodash';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tasks-completed',
  templateUrl: './tasks-completed.component.html',
  styleUrls: ['./tasks-completed.component.css']
})
export class TasksCompletedComponent implements OnInit {
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
        var i = this.tasks.length;
        while (i--) {
          if (this.tasks[i].userDoingTaskUsername !== this.user.username) {
            this.tasks.splice(i, 1);
          }
        }
        //Remove completed tasks
        var i = this.tasks.length;
        while (i--) {
          if (this.tasks[i].taskId.completed !== true) {
            this.tasks.splice(i, 1);
          }
        }

        this.tasksToDo = this.tasks;
      },
      err => console.log(err)
    );
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  ViewUserProfile(username) {
    this.router.navigate([username]);
  }
}
