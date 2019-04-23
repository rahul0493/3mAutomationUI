import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderState } from '../auth/loaderState.model';

@Injectable()
export class SpinnerService {

    // isLoading = new Subject<boolean>();
    // show() {
    //     console.log('show');
    //     this.isLoading.next(true);
    // }
    // hide() {
    //     console.log('hide');
    //     this.isLoading.next(false);
    // }

//     public visibility: EventEmitter<boolean> = new EventEmitter();
//     public notVisibility: EventEmitter<boolean> = new EventEmitter();

//   constructor() { }
constructor() { }
private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  
  
  show() {
    //console.log('showSer');
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide() {
   // console.log('hideSer');
    this.loaderSubject.next(<LoaderState>{ show: false });
  }

}