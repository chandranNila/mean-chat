import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*$(document).ready(function() {
      $('.show').click(function() {
          $('.toast').fadeIn('2000');
        setTimeout(function(){
          $('.toast').fadeOut('2000');
        }, 3000);
        });
    });*/
    /*(function() {

    })();*/
  }

}
