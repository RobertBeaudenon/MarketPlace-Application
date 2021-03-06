import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';

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

  user: any;
  selectedFile: any;
  images = [];
  socket: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.GetUser();

    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserByID(this.user._id).subscribe(
      data => {
        this.images = data.result.images;
      },
      err => console.log(err)
    );
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

  upload() {
    //verify that the file is not empty, prohibiting user to click on upload with adding any file
    if (this.selectedFile) {
      this.usersService.AddImage(this.selectedFile).subscribe(
        data => {
          this.socket.emit('refresh', {});
          //Clear field of image uploaded name
          const filePath = <HTMLInputElement>document.getElementById('filePath');
          filePath.value = '';
          console.log(data);
        },
        err => console.log(err)
      );
    }
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

  SetProfileImage(image) {
    this.usersService.SetDefaultImage(image.imgS3Key).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }
}
