import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  token: any;
  streamsTab = false;
  favoriteStreamsTab = false;

  ngOnInit() {
    this.streamsTab = true;
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

  ChangeTabs(value) {
    if (value === 'streams') {
      this.streamsTab = true;
      this.favoriteStreamsTab = false;
    }

    if (value === 'top') {
      this.streamsTab = false;
      this.favoriteStreamsTab = true;
    }
  }
}
