import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';

declare let $: any;
/*declare const gapi: any;*/

@Component({
  selector: 'app-google-api',
  templateUrl: './google-api.component.html',
  styleUrls: ['./google-api.component.css']
})


export class GoogleApiComponent implements OnInit {


  /*public auth2: any;
  public loginAuth: any;*/
  constructor() { }

  ngOnInit() {}

  /*ngAfterViewInit() {
    gapi.load('auth2',  () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1047694967227-4cdv4l55aam51ph92r89mhsdodae96t0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('glogin'));
    });
  }

  getLoginAuth() {
    console.log('this.loginAuth', this.loginAuth);
    return this.loginAuth;

  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (loggedInUser) => {
        console.log('loggedInUser', loggedInUser);
        const profile = loggedInUser.getBasicProfile();
        console.log('profile', profile);
        this.loginAuth = {
          name: profile.ofa,
          emailId: profile.U3
        };
        console.log('this.loginAuth', this.loginAuth);
        console.log('getLoginAuth()', this.getLoginAuth());
        gapi.client.load('plus', 'v1', function () {
          const request = gapi.client.plus.people.get({
            'userId': 'me'
          });
          console.log('hi request', request);
          request.execute(function (resp) {
            console.log('hi resp', resp);
            const sample = resp;
            console.log('sample', sample.name.givenName);

          });

        });
        this.router.navigate(['/registrationForm']);

      }, function (error) {
      console.log('error', error);
      });
  }
*/
  /*signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    console.log('auth2', auth2);
    auth2.disconnect().then(function () {
      $('.userContent').html('');
      /!* $('#gSignIn').slideDown('slow');*!/
      /!*window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";*!/
      document.location.href = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://ocalhost:4200/landing';
      localStorage.clear();
      sessionStorage.clear();

    });

  }
*/


}




