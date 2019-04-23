import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {SpinnerService} from '../auth/spinner.service';

@Injectable({
  providedIn: 'root'
})

export class SpinnerInterceptorService implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {  }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.spinner.show();
//     return next.handle(req).pipe(
//         finalize(() => this.spinner.hide())
//     );
// }
// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   this.spinner.visibility.emit(true);
//   return next.handle(req)
//     .pipe(
//     delay(1000),
//     finalize(() => this.spinner.notVisibility.emit(false))
//     )


// }


intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  this.showLoader();
  //console.log('inter');
  return next.handle(req).pipe(tap((event: HttpEvent<any>) => { 
    if (event instanceof HttpResponse) {
      this.onEnd();
    }
  },
    (err: any) => {
      this.onEnd();
  }));
}
private onEnd(): void {
  this.hideLoader();
}
private showLoader(): void {
  this.spinner.show();
  //console.log('showed');
}
private hideLoader(): void {
  this.spinner.hide();
 // console.log('hidden');
}
}





