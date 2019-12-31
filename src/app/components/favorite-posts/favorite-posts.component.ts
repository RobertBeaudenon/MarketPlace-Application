import { Component, OnInit, ModuleWithComponentFactories, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment'; //For the format of the date on posts , moment is the variable that we can directly use
import _ from 'lodash';

@Component({
  selector: 'app-favorite-posts',
  templateUrl: './favorite-posts.component.html',
  styleUrls: ['./favorite-posts.component.css']
})
export class FavoritePostsComponent implements OnInit {
  btnElement: any;
  socket: any;
  user: any;
  favoritePosts = []; //initializing empty array
  assigned: boolean;

  constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.btnElement = document.querySelector('.card-action'); //selecting block of html using class name
    this.user = this.tokenService.GetPayload(); //retreiving the user object

    //will be called once
    this.AllPosts();

    //will be called all the time
    this.socket.on('refreshPage', data => {
      this.AllPosts();
    });
  }

  AllPosts() {
    this.assigned = true;
    //we subscribe because it resturns an observable
    this.postService.getAllPosts().subscribe(
      data => {
        console.log(data);
        _.remove(data.favorites, { assigned: this.assigned }); //remove posts that are already have someone assigned

        this.favoritePosts = data.favorites;
      },
      err => {
        if (err.error.token === null) {
          //When token is expired we set the token to null in the backend(helpers/authHelper)
          this.tokenService.DeleteToken();
          this.router.navigate(['']); //redirect us to login page
        }
      }
    );
  }

  LikePost(post) {
    this.postService.addLike(post).subscribe(
      data => {
        //console.log(data);
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  CheckInLikesArray(arr, username) {
    return _.some(arr, { username: username }); //verify that username exist
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  OpenCommentBox(post) {
    this.router.navigate(['post', post._id]); //our new route will be 'post/id'
  }

  AddRequest(post) {
    // console.log(post);
    this.postService.addRequest(post.user, post).subscribe(data => {
      //console.log(data);
      this.socket.emit('refresh', {});
    });
  }

  //class implement AfterViewInit
  ngAfterViewInit() {
    //this.btnElement.style.display = 'none'; //hiding
  }

  CheckInRequestsArray(arr, username) {
    return _.some(arr, { username: username });
  }
}
