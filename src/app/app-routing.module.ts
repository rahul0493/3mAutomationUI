import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './auth/auth-gaurd.service';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HostDetailsComponent } from './host-details/host-details.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DbConnectionComponent } from './db-connection/db-connection.component';

const routes: Routes = [
  {"path":'',component:HomeComponent,canActivate: [AuthGaurdService]},
  {"path":'login',component:LoginComponent},
  {"path":'hostDetails',component:HostDetailsComponent},
  {'path':'newPass/:page',component:NewPasswordComponent},
  {'path':'changPass/:page',component:NewPasswordComponent},
  {'path':'resetPass',component:ResetPasswordComponent},
  {'path':'dbConn',component:DbConnectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
