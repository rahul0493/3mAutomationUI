import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {

    isLoading = new Subject<boolean>();
    show() {
        console.log('show');
        this.isLoading.next(true);
    }
    hide() {
        console.log('hide');
        this.isLoading.next(false);
    }

}