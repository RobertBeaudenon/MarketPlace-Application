import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit, AfterViewInit {
  tabElement: any;

  constructor() {}

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit() {
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
    this.tabElement.style.display = 'none';
  }
}
