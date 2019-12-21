import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket: any;
  posts = []; //initializing empty array
  constructor(private postService: PostService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    //will be called once
    this.AllPosts();

    //will be called all the time
    this.socket.on('refreshPage', data => {
      this.AllPosts();
    });
  }

  AllPosts() {
    //we subscribe because it resturns an observable
    this.postService.getAllPosts().subscribe(data => {
      console.log(data);
      this.posts = data.posts;
    });
  }

  LikePost(post) {
    this.postService.addLike(post).subscribe(
      data => {
        console.log(data);
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  // CheclInLikesArray(arr, username) {
  //   return _.some(arr, { username: username });
  // }

  // TimeFromNow(time) {
  //   return moment(time).fromNow();
  // }

  OpenCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }
}
