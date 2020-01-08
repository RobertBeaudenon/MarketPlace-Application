import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  //using thw input operator because we are sending data from the parent component to the child one in this case from Chat component to message component
  @Input() users;

  receiver: String;
  user: any;
  message: String; //whatever is typed in textarea of chat with the use of ngModel ="message" it will be retreived form the html into this var
  receiverData: any;
  messages = [];
  socket: any;
  typingMessage;
  typing = false;
  usersArray = [];

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.GetUserByUsername(this.receiver);

      this.socket.on('refreshPage', () => {
        this.GetUserByUsername(this.receiver);
      });
    });

    this.usersArray = this.users;
    console.log(this.usersArray);

    this.socket.on('is_typing', data => {
      //we double verify that we are displaying the isTyping event to the receiver
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });

    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = false;
      }
    });
  }

  ngAfterViewInit() {
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };

    this.socket.emit('join chat', params);
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
          this.socket.emit('refresh', {});
          this.message = '';
        });
    }
  }

  //on keypress in textarea we emit the event to the server by passing the sender and receiver
  IsTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiver
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    //if the user stops typing for 500ms then it's going to emit that event
    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.receiver
      });
    }, 500);
  }
}
