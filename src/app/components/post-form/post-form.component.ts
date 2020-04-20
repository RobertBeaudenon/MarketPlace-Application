import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';

import { FileUploader } from 'ng2-file-upload';
const URL = 'http://localhost:3000/api/chatapp/upload-image';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',

  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true //to upload only one file at a time
  });

  selectedFile: any;

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
    let body;
    //If the user create a post without uploading an image, we create the object body that has post in it
    if (!this.selectedFile) {
      body = {
        post: this.postForm.value.post,
        compensation: this.postForm.value.compensation,
        time: this.postForm.value.time,
        latitude: 45.8848,
        longitude: -74.54292
      };
    } else {
      body = {
        post: this.postForm.value.post,
        image: this.selectedFile,
        compensation: this.postForm.value.compensation,
        time: this.postForm.value.time,
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
    this.postService.addPost(body).subscribe(data => {
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

  onFileSelected(event) {
    //event is an array that will contain the image as one of its input
    const file: File = event[0];

    this.ReadAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  ReadAsBase64(file): Promise<any> {
    //Using file reader APIs to get the content of files for more info: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    //return a blob
    const reader = new FileReader();

    //beacause method is retruning a promise
    const fileValue = new Promise((resolve, reject) => {
      //event listening on load event
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      //error
      reader.addEventListener('error', event => {
        reject(event);
      });

      //if successful
      reader.readAsDataURL(file);
    });
    return fileValue;
  }
}
