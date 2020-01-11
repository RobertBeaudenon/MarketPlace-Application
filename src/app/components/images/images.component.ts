import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/chatapp/upload-image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true //to upload only one file at a time
  });

  selectedFile: any;

  constructor() {}

  ngOnInit() {}

  onFileSelected(event) {
    const file: File = event[0];

    this.ReadAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  upload() {
    console.log(this.selectedFile);
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
