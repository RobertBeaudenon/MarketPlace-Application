import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  token: any;
  myTasksTab = false;
  tasksToBeCompletedTab = false;

  ngOnInit() {
    this.myTasksTab = true;
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

  ChangeTabs(value) {
    if (value === 'myTasks') {
      this.myTasksTab = true;
      this.tasksToBeCompletedTab = false;
    }

    if (value === 'tasksToBeCompleted') {
      this.myTasksTab = false;
      this.tasksToBeCompletedTab = true;
    }
  }
}
