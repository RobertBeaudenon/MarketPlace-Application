import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = []; //initializing empty array
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.AllPosts();
  }

  AllPosts() {
    //we subscribe because it resturns an observable
    this.postService.getAllPosts().subscribe(data => {
      console.log(data);
      this.posts = data.posts;
    });
  }
}
