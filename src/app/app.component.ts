import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private tokenService: TokenService) {}
  ngOnInit() {
    //We are making sure that if token exist in browser than user should not login again but is redirected to streams page until he manualy logout which will delete the token
    const token = this.tokenService.GetToken();
    if (token) {
      this.router.navigate(['streams']);
    } else {
      this.router.navigate(['streams']);
    }
  }
}
