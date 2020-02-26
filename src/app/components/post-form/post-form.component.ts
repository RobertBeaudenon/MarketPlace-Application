import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',

  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  socket: any; //we emit the events through socket
  postForm: FormGroup;
  latitude: any;
  longitude: any;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required],
      compensation: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  submitPost() {
    console.log(this.postForm);
    console.log(this.latitude);
    console.log(this.longitude);
    this.postService.addPost(this.postForm.value, this.latitude, this.longitude).subscribe(data => {
      //console.log(data);
      this.socket.emit('refresh', {}); //creating the event for the server , event name : refresh, it will listen in streams.js
      this.postForm.reset();
    });
  }

  getLatitude($event) {
    this.latitude = $event;
    console.log(this.latitude);
  }

  getLongitude($event) {
    this.longitude = $event;
    console.log(this.longitude);
  }
}
