import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
  postId: any;

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {}

  // class implements OnInit
  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content'); //selecting block of html using class name
    this.postId = this.route.snapshot.paramMap.get('id'); //to get post id from the route, if we check in streams-routing module the parameter fo the route is 'id'

    this.init();
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
    console.log(this.commentForm.value);
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.commentForm.reset();
    });
  }
}
