import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerInterceptorService } from './auth/spinner-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HostDetailsComponent } from './host-details/host-details.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DbConnectionComponent } from './db-connection/db-connection.component';
import { ServerRestartComponent } from './server-restart/server-restart.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import {SpinnerService} from './auth/spinner.service';
import { ServerStatusComponent } from './server-status/server-status.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { EventReportComponent } from './event-report/event-report.component';
import { ForbiddenErrorComponent } from './forbidden-error/forbidden-error.component';
import { ShiftResourceComponent } from './shift-resource/shift-resource.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HostDetailsComponent,
    NewPasswordComponent,
    ResetPasswordComponent,
    DbConnectionComponent,
    ServerRestartComponent,
    CommingSoonComponent,
    ServerStatusComponent,
    AdminRoleComponent,
    EventReportComponent,
    ForbiddenErrorComponent,
    ShiftResourceComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
    SpinnerService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
