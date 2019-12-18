import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  constructor(private tokenService: TokenService) {}

  //var of type any
  token: any;

  ngOnInit() {
    //if sign up successfull or login we are going to retreive the token in the streams page
    this.token = this.tokenService.GetToken();
    console.log(this.token);
  }
}
