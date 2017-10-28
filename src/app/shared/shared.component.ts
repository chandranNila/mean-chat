import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../chat.service';
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
import {isUndefined} from 'util';
import {environment} from '../../environments/environment';
import * as _ from 'lodash';

declare const gapi: any;
declare var $: any;
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
  providers: [ChatService]
})
export class SharedComponent implements OnInit, AfterViewChecked {

  /*Individual Chat*/

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public auth2: any;
  public chatLists: any[] = [];
  public selectedUser: any;
  public chats: any;
  public sender = {senderId : '', receiverId: '', senderName: '',  message: '', type: '', profilePic: '', senderProfile: ''};
  public coversation: any;
  public lastMessage: any;
  public loginUser: any;
  public userList: any;
  public sendMess = false;
  public activeName: any;
  public activeProfile: any;
  public needGroupName: any;


  /*fileUpload*/

  public files;
  public fileDetails: any;
  public filetype = 'file';
  public textype = 'text';
  public isUpload = false;
  public indFile;
  public groupFile;

  /*For Sidebar*/

  public singalUser = false;
  public group = false;
  public groupCreatePopup = false;
  public createdNewGroup: any;

  /*For Main Content*/

  public singleMessage = false;
  public groupMessage = false;
  public baseUrl = `${environment.baseUrl}`;
  public groupFileDetails: any;

  socket = io(`${environment.socketUrl}`);

  /*Group Chat*/

  public newGroup = {
    groupAdmin : '',
    groupName : '',
    groupAdminId: '',
    groupMember: [
      {
        userId: '',
        userName: ''
      }
    ],
  };
  public activeGroupPic: any;
  public groupLists: any;
  public groupChats: any;
  public groupSingalmessage = {room : '', nickname: '',  message: '', type: 'text', groupId: '', profilePic: ''};
  public lastGroupmessage: any;
  public groupResponce: any;
  public emitData: any;
  public listOfGroup: any;
  public groupMemberList: any;

  public individualEnable = '';
  public groupEnable = '';


  public typing = false;
  public timeout: any;
  public selectorList = {
    senderId : '',
    receiverId : '',
    senderName : '',
    typing: ''
  };
  public grouptype = {
    senderId : '',
    senderName : '',
    typing: '',
    room: ''
  };
  public typingStatus: any;
  public groupTypingStatus: any;
  public groupTypingName: any;
  public typingName: any;
  public unAddedMembers: any;
  public profile: any;
  public profileSize: any;
  public groupIcon: any;


  setHeight() {
    const winheight = $(window).height();
    $('.content-i ').css('height', winheight);
    const fullheight = winheight - 154;
    const totalside = winheight - 30;
    const sideheight = winheight - 110;
    $('.chat-content-w').css('height', fullheight);
    $('.full-chat-i').css('height', totalside);
    $('.side-scroll').css('height', sideheight);
  }

  constructor(private router: Router, private chatService: ChatService) {
    $(window).resize(function() {
      const winheight = $(window).height();
      $('.content-i ').css('height', winheight);
      const fullheight = winheight - 154;
      const totalside = winheight - 30;
      const sideheight = winheight - 110;
      $('.chat-content-w').css('height', fullheight);
      $('.full-chat-i').css('height', totalside);
      $('.side-scroll').css('height', sideheight);
    });
  }


  ngOnInit() {
    this.unAddedMembers = [];
       setInterval(() => {
         if (this.groupEnable === 'groupMeg') {
           console.log('Hi');

         } else {
           this.friendsList(undefined);
         }
       }, 3000);

   /*this.activeProfile = '';*/

    $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('active');
      alert(1);
    });


    this.groupFriendslist(isUndefined);

    document.addEventListener('DOMContentLoaded', function () {
      if (Notification['permission'] !== 'granted') {
        Notification.requestPermission();
      }
    });

    $(function() {
      $('div .nav > li > a').click(function (evt) {
        evt.preventDefault();
        const obj = $(this),
          objParent = obj.parent(),
          allLi = objParent.parent().find('li');

        $('div li').removeClass('active');
        allLi.removeClass('active');
        objParent.addClass('active');
      });
    });

    /*$(document).ready(function() {
   function setHeight() {
      const winheight = $(window).height();
      console.log('winheight', winheight);
      const mainheight = winheight - 70;
      console.log('mainheight', mainheight);
      $('.forHigh').css('height', mainheight);
      const fullheight = winheight - 200;
      const totalside = winheight - 85;
      const sideheight = winheight - 175; /!*275*!/
      $('.chat-content-w').css('height', fullheight);
      $('.full-chat-i').css('height', totalside);
      $('.side-scroll').css('height', sideheight);


    }

      setHeight();
      $(window).resize(function() {
        setHeight();
      });
    });*/


    this.socket.on('userRes-message', function(data){
      console.log('userRes-message data', data);
    });


    this.sender.type = 'text';
    this.groupSingalmessage.type = 'text';
    this.loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log('loginUser', this.loginUser);
    this.sender.senderProfile = this.loginUser.path;
    console.log('this.sender.senderProfile', this.sender.senderProfile);
    this.sender.senderId = this.loginUser._id;
    this.sender.senderName = this.loginUser.username;
    this.grouptype.senderId = this.loginUser._id;
    this.grouptype.senderName = this.loginUser.username;
    this.newGroup.groupAdmin = this.loginUser.username;
    this.newGroup.groupAdminId = this.loginUser._id;
    this.newGroup.groupMember[0].userName = this.loginUser.username;
    this.newGroup.groupMember[0].userId = this.loginUser._id;
    console.log('this.newGroup.groupAdminId', this.newGroup.groupAdminId);
    this.groupSingalmessage.nickname = this.loginUser.username;
    console.log('this.groupSingalmessage', this.groupSingalmessage);

    this.socket.on('add-message', function (data) {
      console.log('this.loginUser emit', this.loginUser);
      if (!this.loginUser.hasOwnProperty(this.loginUser._id)) {
        console.log('data add on', data);
        this.notifyMe(data);
        console.log('data.message.receiverId Up', data.message.receiverId);
        console.log('this.lastMessage.receiverId Up', this.lastMessage.receiverId);
        console.log('data.message.senderId Up', data.message.senderId);
        console.log('this.lastMessage.senderId Up', this.lastMessage.senderId);
        if ((data.message.receiverId === this.lastMessage.receiverId) || (data.message.senderId === this.lastMessage.receiverId && this.lastMessage.senderId === data.message.receiverId)) {
          console.log('true');
          console.log('data.message.receiverId', data.message.receiverId);
          console.log('this.lastMessage.receiverId', this.lastMessage.receiverId);
          console.log('data.message.senderId', data.message.senderId);
          console.log('this.lastMessage.senderId', this.lastMessage.senderId);
          this.chats.push(data.message);
          console.log('this.chats on get', this.chats);
        }

        this.scrollToBottom();
      }
    }.bind(this));

    this.friendsList(undefined);

    this.socket.on('new-message', function (data) {
      console.log('data', data);
      this.emitData = data;
      console.log('this.emitData', this.emitData.message.nickname);
      const emp =  JSON.parse(localStorage.getItem('group'));
      console.log('emp', emp);
      if (this.emitData.message.room === emp) {
        console.log('data.message.room', this.emitData.message.room);
        console.log('data.message', this.emitData.message.message);
        this.groupChats.push(this.emitData.message);
        console.log('this.groupChats', this.groupChats);
        this.scrollToBottom();
      }
    }.bind(this));

    this.socket.on('typing', function (data) {
      console.log('data typing', data);
      this.typingName = data.message.senderName;
      console.log('this.typingName', this.typingName);
      const sessionData = JSON.parse(sessionStorage.getItem('loginUser'));
      console.log('this.loginUser', sessionData._id);
      console.log('data.message.receiverId', data.message.receiverId);
      if ((data.message.receiverId === this.loginUser._id) && (data.message.senderId === this.lastMessage.receiverId && this.lastMessage.senderId === data.message.receiverId)) {
        console.log('this.loginUser2', sessionData._id);
        console.log('data.message.receiverId2', data.message.receiverId);
        this.typingStatus = data.message.typing;
        this.typingName = data.message.senderName;
        console.log('this.typingName', this.typingName);
        console.log('inside if', this.typingStatus);
      }
    }.bind(this));


    this.socket.on('group-typing', function (data) {
      console.log('data group-typing', data);
      if (data.message.room === this.groupSingalmessage.room && this.loginUser._id !== data.message.senderId) {
        console.log('this.groupSingalmessage.room', this.groupSingalmessage.room);
        console.log('data.message.room', data.message.room);
        this.groupTypingStatus = data.message.typing;
        this.groupTypingName = data.message.senderName;
        console.log('inside if', this.groupTypingStatus);
      }
    }.bind(this));

    console.log('singalUser', this.singalUser);
    console.log('activeName', this.activeName);
  }

  /*End OnInit()*/





  notifyMe(data) {
    console.log('notify', data);
    if (this.loginUser._id === data.message.receiverId) {
      console.log('this.loginUser._id', this.loginUser._id);
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
      }

      if (Notification['permission'] !== 'granted') {
        Notification.requestPermission();
      } else {
        const notification = new Notification(data.message.senderName, {
          icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: data.message.message,
        });

      }
    }

  }



  typeMessage(ev) {
    console.log('ev', ev);
    this.selectorList.typing = 'typing...';
    console.log('typing', this.loginUser);
    this.socket.emit('typing-message', this.selectorList);
    console.log('afetr');
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.selectorList.typing = '';
      console.log('timeout');
      this.socket.emit('typing-message', this.selectorList);
    }, 1000);
  }

  groupTypeMessage(ev, room) {
    console.log('ev', ev);
    console.log('room', room);
    this.grouptype.typing = 'typing...';
    this.grouptype.room = room;
    console.log('typing', this.loginUser);
    this.socket.emit('group-typing-message', this.grouptype);
    console.log('afetr');
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.grouptype.typing = '';
      console.log('timeout');
      this.socket.emit('group-typing-message', this.grouptype);
    }, 1000);
  }





  createGroups() {
    this.groupCreatePopup = true;
  }

  add() {
    this.groupCreatePopup = false;

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  /*List Of Users*/

  friendsList(data) {
    this.individualEnable = 'indMessage';
    this.singalUser = true;
    this.group = false;
    this.groupMessage = false;
    this.chatService.userList(data).then((result) => {
      this.userList = result;
      console.log('this.userList', this.userList);
      this.setHeight();
      const empArr = [];
      this.userList.forEach( item => {
        if (item.username !== this.loginUser.username) {
          empArr.push(item);
        }
      });
      this.chatLists = empArr;
      console.log('this.chatLists', this.chatLists);
      console.log('this.singleUser', this.singalUser);
    }, (err) => {
    });
  }

  /*Choose One User*/

  selectUser(receiverId, senderId, selectedName, selectedProfile) {
    $('.userDefaultBrowser').css('display', 'inline-block');
    this.singleMessage = true;
    this.groupMessage = false;
    console.log('selectedName', selectedName);
    this.activeName = selectedName;
    this.activeProfile = selectedProfile;
    console.log('this.activeProfile', this.activeProfile);
    this.sendMess = true;
    console.log('selectedUser', receiverId);
    this.sender.receiverId = receiverId;
    console.log('senderUser', senderId);
    this.lastMessage = {receiverId, senderId};
    console.log('this.lastMessage', this.lastMessage);
    this.selectorList.senderId = senderId;
    this.selectorList.receiverId = receiverId;
    this.selectorList.senderName = selectedName;
    this.chatService.selectSingalUser(this.lastMessage).then((res) => {
      console.log('res', res);
      this.chats = res;
      this.setHeight();
      console.log('this.chats', this.chats);
    }, (err) => {
      console.log(err);
    });

  }

  /*User Message*/

  individualMessage(sender) {

    console.log('activeProfile', this.activeProfile);
    console.log('sender', sender);
    if (sender.type === 'text') {
      sender.profilePic = this.activeProfile;
      this.chatService.getChatBySingleUser(sender).then((res) => {
        console.log('res message', res);
        this.coversation = res;
        this.socket.emit('user-message', this.coversation);
        console.log('this.individualChats', this.coversation);
      }, (err) => {
        console.log(err);
      });
      this.sender.message = '';
    }else {
      console.log('files', this.files);
      const fileUpload = {
        file: this.files,
        senderId: this.sender.senderId,
        receiverId: this.sender.receiverId,
        senderName: this.sender.senderName,
        type: 'file',
        profilePic: this.activeProfile,
        message: this.sender.message,
        senderProfile: this.sender.senderProfile
      };
      console.log('fileUpload', fileUpload);
      this.chatService.getChatBySingleUser(fileUpload).then((result) => {
        this.singleMessage = true;
        console.log('fileUpload', result);
        this.fileDetails = result;
        this.chats.originalname = this.fileDetails.originalname;
        console.log('this.chats.originalname', this.chats.originalname);
        this.socket.emit('user-message', this.fileDetails);
        console.log('this.fileDetails', this.fileDetails);

      }, (err) => {
      });
      this.sender.message = '';
      this.indFile = '';
    }
  }

  /*File Upload */



  onChange(event, para) {
    console.log('para', para);
    if (para === 'create') {
      console.log('onChange', event);
      this.groupIcon = event.target.files;
      console.log('files', this.groupIcon);
      const fileInput = $('.upload-file');
      const maxSize = fileInput.data('max-size');
      if (fileInput.get(0).files.length) {
        const fileSize = fileInput.get(0).files[0].size; // in bytes
        if (fileSize > maxSize) {
          this.profileSize = ' Selected file size is more than ' + maxSize + ' bytes';
          this.profile = '';
          return false;
        }else {
          this.profileSize = 'file size is correct - ' + fileSize + ' bytes';
        }
      }
    }else {
      console.log('onChange else', event);
      this.files = event.target.files;
      console.log('files', this.files);
      this.isUpload = true;
    }
  }

  /*Create Group*/


  createGroup() {
    console.log('this.newGroup', this.newGroup);
    const groupProfile = {
      newGroup: this.newGroup,
      file: this.groupIcon
    };
    console.log('groupProfile', groupProfile);
    this.chatService.groupCreate(groupProfile).then((result) => {
      console.log('result create group', result);
      alert('Created Successfully');
    }, (err) => {
      console.log(err);
    });
  }



  /*Get All Groups*/


  grouplist(data, groupMgs) {
    this.groupEnable = 'groupMeg';
    console.log('groupList data', data);
    this.singalUser = false;
    this.singleMessage = false;
    this.group = true;
    console.log('singalUser', this.singalUser);
    const userId = {userId: data};
    this.chatService.groupList(userId).then((result) => {
      console.log('result', result);
      this.groupLists = result;
      this.setHeight();
      console.log('this.groupLists', this.groupLists);
    }, (err) => {
    });
  }

  /*Get One Group*/

  selectGroup(groupName, groupId, groupImagePath) {
    this.groupMembers(groupName);
    this.activeGroupPic = groupImagePath;
    console.log('this.activeGroupPic', this.activeGroupPic);
    this.groupSingalmessage.room = groupName;
    this.groupSingalmessage.groupId = groupId;
    this.needGroupName = groupId;
    this.singleMessage = false;
    this.groupMessage = true;
    this.sendMess = true;
    console.log('groupName', groupName);
    const groupNameAndId = {
      room: groupName,
      groupId: groupId
    };
    localStorage.setItem('group', JSON.stringify(groupName));
    this.chatService.getChatByRoom(groupNameAndId).then((res) => {
      this.groupChats = res;
      this.setHeight();
      console.log('this.groups', this.groupChats);
    }, (err) => {
      console.log(err);
    });
  }

  /*Send Group Message*/

  sendGroupMessage(singalmess) {
    console.log('singalmess', singalmess);
    if (singalmess.type === 'text') {
      this.groupSingalmessage.profilePic = this.loginUser.path;
      this.lastGroupmessage = this.groupSingalmessage;
      console.log('this.lastGroupmessage', this.lastGroupmessage);
      this.chatService.getChatByGroup(this.lastGroupmessage).then((res) => {
        console.log('res shared', res);
        this.groupResponce = res;

        this.socket.emit('save-message', this.groupResponce);
        console.log('this.groupResponce emit', this.groupResponce);
      }, (err) => {
        console.log(err);
      });
      this.groupSingalmessage.message = '';
    }else {
      console.log('files', this.files);
      const fileUploadInGroup = {
        file: this.files,
        room: this.groupSingalmessage.room,
        type: 'file',
        message: this.groupSingalmessage.message,
        nickname: this.groupSingalmessage.nickname,
        groupId: this.groupSingalmessage.groupId,
        profilePic: this.loginUser.path
      };
      console.log('fileUpload', fileUploadInGroup);
      this.chatService.getChatByGroup(fileUploadInGroup).then((result) => {
        this.groupFileDetails = result;
        console.log('this.groupFileDetails', this.groupFileDetails);
        this.socket.emit('save-message', this.groupFileDetails);

      }, (err) => {
      });
      this.groupSingalmessage.message = '';
      this.groupFile = '';
      console.log('this.groupFile', this.groupFile);
    }
  }

  /*Add Friends in Group*/

  addfriends(username, userId, path, groupName, groupId) {
    console.log('username', username);
    console.log('userId', userId);
    console.log('groupName', groupName);
    console.log('path', path);
    const groupMember = {userId, username, path};
    const addedMemberDetails = {groupId, groupMember};
    this.chatService.addMember(addedMemberDetails).then((res) => {
      alert(res['objValue'].message);
    }, (err) => {
      console.log(err);
    });
  }


  /*Get All friends*/

  groupFriendslist(data) {
    console.log('groupFriendslist data', data);
    this.chatService.friendsList(data).then((result) => {
      console.log('FriendsList result', result);
      this.listOfGroup = result;
      console.log('this.listOfGroup', this.listOfGroup);
      this.listOfGroup.forEach( item => {
        console.log('groupFriendsList item', item);
      });
    }, (err) => {
    });
  }

  logOut(username) {
    console.log('username', username);
    const logOutUser = {username: username};
    this.chatService.logout(logOutUser).then(res => {
      console.log('res logout', res);
      const outLogin = res;
      console.log('outLogin', outLogin);
      if (outLogin !== null) {
        gapi.auth.signOut();
        document.location.href = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://mindzen.net:3000/landing';
        localStorage.clear();
        sessionStorage.clear();
             }else {
        alert('Logout Failed');
      }
    });
    this.loginUser = {};
    sessionStorage.clear();
  }

  remove_duplicates(userList, groupPeople) {

    console.log('userList', userList);
    console.log('groupPeople', groupPeople);

    function comparer1(otherArray) {
      return function(current){
        console.log('current', current);
        return otherArray.filter(function(other){
          return other.userId === current._id && other.userName === current.username;
        }).length === 0;
      };
    }

    function comparer2(otherArray) {
      return function(current){
        console.log('current', current);
        return otherArray.filter(function(other){
          return other._id === current.userId && other.username === current.userName;
        }).length === 0;
      };
    }


    const onlyInB = userList.filter(comparer1(groupPeople));
    const onlyInA = groupPeople.filter(comparer2(userList));
    const result = onlyInA.concat(onlyInB);
    console.log(result);
    this.unAddedMembers = result;
    console.log('this.unAddedMembers', this.unAddedMembers);
  }


  groupMembers(groupNames) {
    console.log('groupName-members', groupNames);
    const groupName = {groupName: groupNames};
    this.chatService.groupMember(groupName).then((result) => {
      console.log('groupMembers result 1 sugu', result);
      this.groupMemberList = result;
      console.log('this.groupMemberList', this.groupMemberList);
    }, (err) => {
    });
  }
}
