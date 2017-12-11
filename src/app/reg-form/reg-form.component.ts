import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {Router} from '@angular/router';
import {LandingComponent} from '../landing/landing.component';

declare var $: any;
@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit, AfterViewInit {

  public users = {username: '', mailId: '', password: '', status: ''};
  public profile: any;
  public profileSize: any;
  public files: any;
  public regDate: any;
  constructor(private router: Router, private chatService: ChatService) {

    this.ngOnInit();
    this.ngAfterViewInit();

    /*const Obj = new LandingComponent(this.router, this.chatService);
    this.regDate = Obj.getLoginAuth();
    console.log('this.regDate', this.regDate);*/
  }

  ngOnInit() {

    this.users.status = 'Offline';
    console.log('reg comp');
   /* this.users = {username: 'Chandran', mailId: 'chandru003r@gmail.com'};
    console.log('this.users', this.users);*/

}

  ngAfterViewInit() {
 /*   console.log('reg comp');
    this.users = JSON.parse(sessionStorage.getItem('loginAuth'));
    console.log('this.users ng after view', this.users);*/
}


  userSignUp() {
    const userDetails = {
      user: this.users,
      file: this.files
    };
    console.log('userDetails', userDetails);
    this.chatService.signUp(userDetails).then((result) => {
      console.log('result', result);
      alert('Created Successfully');
    }, (err) => {
      console.log(err);
    });
    this.router.navigate(['/landing']);
  }

  onChange(event) {
    console.log('onChange', event);
    this.files = event.target.files;
    console.log('files', this.files);
   const fileInput = $('.upload-file');
   const maxSize = fileInput.data('max-size');
    if (fileInput.get(0).files.length) {
      const fileSize = fileInput.get(0).files[0].size; // in bytes
      if (fileSize > maxSize) {
        this.profileSize = ' Selected file size is more than ' + maxSize + ' bytes';
       /* alert('file size is more than ' + maxSize + ' bytes');*/
       this.profile = '';
        return false;
      }else {
        this.profileSize = 'file size is correct - ' + fileSize + ' bytes';
      }
    }/*else {
      alert('Please select the file to upload');
      return false;
    }*/
  }

  /*onChange(event) {

    this.isUpload = true;
  }*/

}
