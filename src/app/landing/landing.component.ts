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
        client_id: '397011996209-v0dh02o698rishvkaa4al6aqcsuvnjvn.apps.googleusercontent.com', /*1047694967227-eh5k2cjpjp9s74f401unfj0jmhp44ast.apps.googleusercontent.com*/
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
      }, function (error) {
        console.log('error', error);
      });

  }

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
