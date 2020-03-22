import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router, private fb: FormBuilder) {}

  token: any;
  streamsTab = false;
  favoriteStreamsTab = false;
  addPostTab = false;
  loginForm: FormGroup;
  errorMessage: string;

  ngOnInit() {
    this.streamsTab = true;
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
    this.init();
  }

  //we initialize the form and set validators to each one in case user forget to specify a field
  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required] //each username,email,password is piped from the HTML using the "formControlName"
    });
  }

  ChangeTabs(value) {
    if (value === 'streams') {
      this.streamsTab = true;
      this.favoriteStreamsTab = false;
      this.addPostTab = false;
    }

    if (value === 'top') {
      this.streamsTab = false;
      this.favoriteStreamsTab = true;
      this.addPostTab = false;
    }

    if (value === 'addPost') {
      this.streamsTab = false;
      this.favoriteStreamsTab = false;
      this.addPostTab = true;
    }
  }

  submit() {
    this.loginForm.reset();
  }
}
