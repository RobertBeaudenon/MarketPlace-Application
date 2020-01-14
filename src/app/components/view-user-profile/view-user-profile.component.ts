import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { arrayAverage } from '../../../assets/js/helpers.js';
import * as moment from 'moment';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit, AfterViewInit {
  tabElement: any;
  profileTab = true;
  postsTab = false;
  posts = [];
  average: any;

  user: any;
  name: any;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit() {
    this.profileTab = true;
    this.tabElement = document.querySelector('.nav-content');
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});

    //we get name of user that we are inspecting profile throught the URL because we added it in the route ex: http://localhost:4200/name
    this.route.params.subscribe(params => {
      this.name = params.name;
      this.GetUserData(this.name);
    });
  }

  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }

  ChangeTab(value) {
    //display posts tab
    if (value === 'posts') {
      this.postsTab = true;
      this.profileTab = false;
    }
    //display profile tab
    if (value === 'profile') {
      this.postsTab = false;
      this.profileTab = true;
    }
  }

  GetUserData(name) {
    this.usersService.GetUserByName(name).subscribe(
      data => {
        console.log(data.result);
        this.posts = data.result.posts.reverse();
        this.user = data.result;
        this.average = arrayAverage(this.user.ratingNumber);
        //this.average = Math.round(this.average);
      },
      err => console.log(err)
    );
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
