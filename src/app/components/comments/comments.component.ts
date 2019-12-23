import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  socket: any;

  commentForm: FormGroup;
  postId: any;
  commentsArray = [];

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {
    this.socket = io('http://localhost:3000');
  }

  // class implements OnInit
  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content'); //selecting block of html using class name
    this.postId = this.route.snapshot.paramMap.get('id'); //to get post id from the route, if we check in streams-routing module the parameter fo the route is 'id'

    this.init();

    this.GetPost();

    //listen events from server (streams.js), so once the user adds a comment its gona trigger the server to send back that refreshPage event, so it's gona reload the getPOst method
    this.socket.on('refreshPage', data => {
      this.GetPost();
    });
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  //class implement AfterViewInit
  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none'; //hiding yhr '.nav-content' block
  }

  AddComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});
      this.commentForm.reset();
    });
  }

  GetPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      // console.log(data);
      this.commentsArray = data.post.comments.reverse();
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
