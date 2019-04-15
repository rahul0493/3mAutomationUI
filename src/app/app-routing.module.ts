import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './auth/auth-gaurd.service';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HostDetailsComponent } from './host-details/host-details.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DbConnectionComponent } from './db-connection/db-connection.component';
import { ServerRestartComponent } from './server-restart/server-restart.component'
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { ServerStatusComponent } from './server-status/server-status.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';

const routes: Routes = [
  {"path":'',component:HomeComponent,canActivate:[AuthGaurdService]},
  {"path":'login',component:LoginComponent},
  {"path":'commingSoon',component:CommingSoonComponent},
  {"path":'hostDetails',component:HostDetailsComponent,canActivate:[AuthGaurdService]},
  {'path':'newPass/:page',component:NewPasswordComponent,canActivate:[AuthGaurdService]},
  {'path':'changPass/:page',component:NewPasswordComponent,canActivate:[AuthGaurdService]},
  {'path':'resetPass',component:ResetPasswordComponent,canActivate:[AuthGaurdService]},
  {'path':'dbConn',component:DbConnectionComponent,canActivate:[AuthGaurdService]},
  {'path':'serverRestart',component:ServerRestartComponent,canActivate:[AuthGaurdService]},
  {'path':'serverStatus',component:ServerStatusComponent,canActivate:[AuthGaurdService]},
  {'path':'roleAccess',component:AdminRoleComponent,canActivate:[AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
