import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from '../chat.service';
import {Router} from '@angular/router';



declare var $: any;

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
  { path: 'landing', title: 'landing',  icon: 'ti-panel', class: '' },
  { path: 'groupChat', title: 'groupChat',  icon: 'ti-user', class: '' },
  { path: 'registrationForm', title: 'regForm',  icon: 'ti-user', class: '' }
  /*{ path: 'table', title: 'Table List',  icon: 'ti-view-list-alt', class: '' },
  { path: 'typography', title: 'Typography',  icon: 'ti-text', class: '' },
  { path: 'icons', title: 'Icons',  icon: 'ti-pencil-alt2', class: '' },
  { path: 'maps', title: 'Maps',  icon: 'ti-map', class: '' },
  { path: 'notifications', title: 'Notifications',  icon: 'ti-bell', class: '' },
  { path: 'upgrade', title: 'Upgrade to PRO',  icon: 'ti-export', class: 'active-pro' },*/
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  /*public chatLists: any;*/
  /**/
  public onlineFlag = navigator.onLine;

  constructor(private router: Router, private chatService: ChatService) {
   /* this.online$ = Observable.merge (
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    );*/
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log('menuItem', this.menuItems);
  }
  /*isNotMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  friendsList(data) {
    console.log('data', data);
    this.chatService.userList(data).then((result) => {
      console.log('result', result);
      this.chatLists = result;
      console.log('this.chatLists', this.chatLists);
      /!*this.socket.emit('save-message', result);*!/
    }, (err) => {
      console.log(err);
    });
  }*/

  /*takeName(name) {
    console.log('ChatName', name);
    this.change.emit(name);
  }*/

}
