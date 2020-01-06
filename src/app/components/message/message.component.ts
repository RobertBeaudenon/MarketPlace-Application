import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  receiver: String;
  user: any;
  message: String; //whatever is typed in textarea of chat with the use of ngModel ="message" it will be retreived form the html into this var
  receiverData: any;
  messages = [];

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.GetUserByUsername(this.receiver);
    });
  }

  GetUserByUsername(name) {
    this.usersService.GetUserByName(name).subscribe(data => {
      this.receiverData = data.result;

      this.getMessages(this.user._id, this.receiverData._id);
    });
  }

  getMessages(senderId, receiverId) {
    this.msgService.GetAllMessages(senderId, receiverId).subscribe(data => {
      console.log(data);
      this.messages = data.messages.message;
    });
  }

  sendMessage() {
    //prevent of sending empty messages
    if (this.message) {
      this.msgService
        .SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(data => {
          console.log(data);
          this.message = '';
        });
    }
  }
}
