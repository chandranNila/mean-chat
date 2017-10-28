

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class ChatService {

 /* progress: number;
  progress$: any;
  progressObserver: any;
  resOut: any;*/
  service: ServiceVar = {
    header: {},
    sessionStore: '',
    authToken: '',
    options: {},
  };
  constructor(private http: Http) {
    this.service.header = new Headers();
    this.service.header.append('Accept', 'application/json');
    this.service.header.append('Authorization', this.service.authToken);
    this.service.options = new RequestOptions({headers: this.service.header, withCredentials: true});
    console.log('environment', environment.baseUrl);
  }



  saveChat(data) {
    console.log('data', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat`, data)
        .map(res => res.json())
        .subscribe(res => {
          console.log('res', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  login(data) {
    console.log('loginData', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/login`, data)
        .map(res => res.json())
        .subscribe(res => {
          console.log('LoginRes', res.obj);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  googleLogin(data) {
    console.log('googleLoginData', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/googleLogin`, data)
        .map(res => res.json())
        .subscribe(res => {
          console.log('LoginRes', res.obj);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  logout(data) {
    console.log('logOutData', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/logout`, data)
        .map(res => res.json())
        .subscribe(res => {
          console.log('LogOutRes', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  userList(data) {
    /*console.log('data inside', data);*/
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/userlist`, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /*select Individual User Message*/
  selectSingalUser(data) {
    console.log('room', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/singleUser`, data)
        .map(res => res.json())
        .subscribe(res => {
          console.log('getChatBySingalUser', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  googleSignUp(data) {
    console.log('profile data', data);
   /* if (data.type === 'account') {*/
      console.log('data', data);
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.baseUrl}chat/googleSignUp`, data)
          .map(res => res.json())
          .subscribe(res => {
            console.log('res', res);
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }


  signUp(data) {
    console.log('profile data', data);
      const formData: FormData = new FormData();
      for (let i = 0; i < data.file.length; i++) {
        console.log('files.length', data.file.length);
        formData.append('file', data.file[i], data.file[i].name);
        console.log('file[i]', data.file[i]);
        console.log('file[i].name', data.file[i].name);
        console.log('formData', formData);
      }
      formData.append('username', data.user.username);
      formData.append('password', data.user.password);
      formData.append('mailId', data.user.mailId);
      formData.append('status', data.user.status);
      console.log('formData2', formData);
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.baseUrl}chat/signup`, formData)
          .map(res => res.json())
          .subscribe(res => {
            console.log('res', res);
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }


  /*Get Individual User Message*/
  getChatBySingleUser(data) {
    if (data.type === 'text') {
      console.log('serviceSender', data);
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.baseUrl}chat/singleUserMessage`, data)
          .map(res => res.json())
          .subscribe(res => {
            console.log('getChatBySingalUser', res);
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }else {
      console.log('file Upload data', data);
      const formData: FormData = new FormData();
      for (let i = 0; i < data.file.length; i++) {
        console.log('files.length', data.file.length);
        formData.append('file', data.file[i], data.file[i].name);
        console.log('file[i]', data.file[i]);
        console.log('file[i].name', data.file[i].name);
        console.log('formData', formData);
      }
      formData.append('senderId', data.senderId);
      formData.append('receiverId', data.receiverId);
      formData.append('senderName', data.senderName);
      formData.append('message', data.message);
      formData.append('type', data.type);
      formData.append('senderProfile', data.senderProfile);
      console.log('formData outer', formData);
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.baseUrl}chat/upload`, formData)
          .map(res => res.json())
          .subscribe(res => {
            console.log('res File Upload', res);
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }


  /*Create Group*/

  groupCreate(data) {
    console.log('groupIcon data', data);
    console.log('groupIcon data groupAdmin', data.newGroup.groupAdmin);
    console.log('groupIcon data groupName', data.newGroup.groupName);
    console.log('groupIcon data groupAdminId', data.newGroup.groupAdminId);
    console.log('groupIcon data groupMember', data.newGroup.groupMember);
    const formData: FormData = new FormData();
    for (let i = 0; i < data.file.length; i++) {
      console.log('files.length', data.file.length);
      formData.append('file', data.file[i], data.file[i].name);
      console.log('file[i]', data.file[i]);
      console.log('file[i].name', data.file[i].name);
      console.log('formData', formData);
    }
    formData.append('groupAdmin', data.newGroup.groupAdmin);
    formData.append('groupName', data.newGroup.groupName);
    formData.append('groupAdminId', data.newGroup.groupAdminId);
    formData.append('groupMember', JSON.stringify(data.newGroup.groupMember));
    console.log('formDate create group', formData);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/createGroup`, formData)
        .map(res => res.json())
        .subscribe(res => {
          console.log('res', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /*Get All Groups*/

  groupList(data) {
    console.log('groupList data service', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/grouplist`, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /*Get Chat By Single Group*/

  getChatByRoom(data) {
    console.log('room', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/groupTotalMessage`,  data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /*Get Group Message*/
  getChatByGroup(data) {
    console.log('groupData', data);
    if (data.type === 'text') {
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.baseUrl}chat/groupMessage`, data)
          .map(res => res.json())
          .subscribe(res => {
            console.log('getChatBySingalUser', res);
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }else {
      console.log('file Upload data in group', data);
      const formData: FormData = new FormData();
      for (let i = 0; i < data.file.length; i++) {
        console.log('files.length', data.file.length);
        formData.append('file', data.file[i], data.file[i].name);
        console.log('file[i]', data.file[i]);
        console.log('file[i].name', data.file[i].name);
        console.log('formData', formData);
      }
      formData.append('room', data.room);
      formData.append('message', data.message);
      formData.append('type', data.type);
      formData.append('nickname', data.nickname);
      formData.append('groupId', data.groupId);
      formData.append('profilePic', data.profilePic);
      console.log('formData outer', formData);
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.baseUrl}chat/groupUpload`, formData)
          .map(res => res.json())
          .subscribe(res => {
            console.log('res File Upload in group', res);
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }

  }



  /*Add Member in  Group*/

  addMember(data) {
    console.log('memberAdded', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/addFriends`, data)
        .map(res => res.json())
        .subscribe(res => {
          console.log('addedMember In Service', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  /*Get All friends*/

  friendsList(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/friendsList`, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  /*Get Group Member*/

  groupMember(data) {
    console.log('groupMember-chat_service', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}chat/groupMember`, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
          console.log('chat sevice res', res);
        }, (err) => {
          reject(err);
        });
    });
  }





}
export class ServiceVar {
  header: any;
  sessionStore: any;
  authToken: any;
  options: any;
}
