import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable} from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import {SpinnerService} from '../auth/spinner.service';

@Injectable({
  providedIn: 'root'
})

export class SpinnerInterceptorService implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(req).pipe(
        finalize(() => this.spinner.hide())
    );
}
}
