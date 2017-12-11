import {AfterViewInit, Component, Injectable, OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import {ChatService} from '../chat.service';


declare var $: any;
/*declare var gapi: any;*/
declare const gapi: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ChatService]
})

export class LandingComponent implements OnInit, AfterViewInit {

 /* users = { username: '', password: '', mailId: ''};*/
  loginUsers = { username: '', password: '', status: ''};
  loginResult;
  public userResponsce: any;
  public auth2: any;
  public loginAuth: any;
  public routing: any;
  public chatInject: any;
  public loginResponse: any;

  constructor(public chatService: ChatService, public router: Router, private zone: NgZone) {
    this.routing = router;
    this.chatInject = chatService;
  }

  ngOnInit() {
    this.loginUsers.status = 'Online';
  }

  ngAfterViewInit() {
    gapi.load('auth2',  () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1047694967227-vkbnvc42dl6lbbm9ct8c3ft4v7evc1nk.apps.googleusercontent.com', /*1047694967227-eh5k2cjpjp9s74f401unfj0jmhp44ast.apps.googleusercontent.com*/
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('glogin'));
    });
  }



  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (loggedInUser) => {
        console.log('loggedInUser', loggedInUser);
        const profile = loggedInUser.getBasicProfile();
        console.log('profile', profile);
        this.loginAuth = {
          username: profile.ofa,
          mailId: profile.U3,
          status: 'Online',
          type: 'account'
        };
        this.chatService.googleSignUp(this.loginAuth).then((result) => {
          console.log('result google sign up', result);
          console.log('obj typeof', typeof result);
          this.loginResponse = result;
          this.loginResult = this.chatService.googleLogin(this.loginResponse).then(res => {
            console.log('loginres', res['obj']);
            const outLogin = res['obj'];
            sessionStorage.setItem('loginUser', JSON.stringify(outLogin));
            console.log('resdfsa', res['objValue'].message);
            this.userResponsce = res['objValue'].message;
            if (this.userResponsce === 'success') {
              console.log('this.userResponsce', this.userResponsce);
              this.zone.run(() => this.router.navigate(['/dashboard']));
            }else {
              console.log('else if');
              alert('authentication faild');
              /*$('.toast').fadeIn('slow');
              setTimeout(function(){
                $('.toast').fadeOut('slow');
              }, 3000);*/
            }
          });
        }, (err) => {
          console.log(err);
        });
       /* sessionStorage.setItem('loginAuth', JSON.stringify(this.loginAuth));*/
        console.log('this.loginAuth', this.loginAuth);
      /*  gapi.client.load('plus', 'v1', function () {
          const request = gapi.client.plus.people.get({
            'userId': 'me'
          });
          console.log('hi request', request);
          request.execute(function (resp) {
            console.log('hi resp', resp);
            const sample = {
              username: resp.name.givenName,
              mailId: resp.emails[0].value,
              type: resp.emails[0].type,
              path: resp.image.url,
              status: 'Online'
            };
            /!*const commonService = new CommonService();
            commonService.setAuthValue(sample);*!/
            console.log('sample', resp.name.givenName);
            console.log('sample', resp.emails[0].value);
            console.log('sample', resp.emails[0].type);
            console.log('sample', resp.url);
            console.log('sample', resp.image.url);
           /!* commonService.getAuthValue();*!/

          });

        });*/


        /*this.router.navigate(['/registrationForm']);*/

      }, function (error) {
        console.log('error', error);
      });

  }

  /*setLoginResponse(res) {
    console.log('res', res);
    this.chatService.signUp(res).then((result) => {
      console.log('result', result);
      alert('Created Successfully');
    }, (err) => {
      console.log(err);
    });
  }*/
  /*User LogIn*/
  userLogin() {
    console.log('loginUsers', this.loginUsers);
    this.loginResult = this.chatService.login(this.loginUsers).then(res => {
      console.log('loginres', res['obj']);
      const outLogin = res['obj'];
      sessionStorage.setItem('loginUser', JSON.stringify(outLogin));
      console.log('resdfsa', res['objValue'].message);
      this.userResponsce = res['objValue'].message;
      if (this.userResponsce === 'success') {
        console.log('this.userResponsce', this.userResponsce);
        alert('Login Successfully');
           /* $('.toast').fadeIn('slow');
            setTimeout(function(){
              $('.toast').fadeOut('slow');
            }, 3000);*/
        this.router.navigate(['/dashboard']);
      }else {
        console.log('else if');
        alert('authentication faild');
        /*$('.toast').fadeIn('slow');
        setTimeout(function(){
          $('.toast').fadeOut('slow');
        }, 3000);*/
      }
    });
  }


}
