import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../chat.service';
import * as io from 'socket.io-client';

/*function io(s: string) {
}*/
@Component({
  selector: 'app-mean-chat',
  templateUrl: './mean-chat.component.html',
  styleUrls: ['./mean-chat.component.css']
})
export class MeanChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chats: any;
  joinned: boolean = false;
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io('http://192.168.1.142:4000');

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user', user);
    if ( user !== null) {
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' };
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      console.log('data', data);
      const emp =  JSON.parse(localStorage.getItem('user')).room;
      console.log('emp', emp);
      if (data.message.room === emp) {
        console.log('data.message.room', data.message.room);
        console.log('data.message', data.message);
        this.chats.push(data.message);
        this.msgData = { room: user.room, nickname: user.nickname, message: '' };
        this.scrollToBottom();
      }
    }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      console.log('Hi scroll');
      console.log('this.myScrollContainer.nativeElement.scrollHeight', this.myScrollContainer.nativeElement.scrollHeight);
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getChatByRoom(room) {
    console.log('room', room);
    this.chatService.getChatByRoom(room).then((res) => {
      this.chats = res;
    }, (err) => {
      console.log(err);
    });
  }

  joinRoom() {
    const date = new Date();
    localStorage.setItem('user', JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    console.log('this.msg', this.msgData);
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    const date = new Date();
    const user = JSON.parse(localStorage.getItem('user'));
    /*this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });*/
   /* console.log('this.socket', this.socket);*/
    localStorage.removeItem('user');
    this.joinned = false;
  }

}


