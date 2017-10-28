import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  authData: any;
  constructor() { }
  setAuthValue(data) {
    console.log('data', data);
    this.authData = data;
  }

   getAuthValue() {
     console.log('this.authData', this.authData);
     return this.authData;
   }

}
