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
import { EventReportComponent } from './event-report/event-report.component';
import { ForbiddenErrorComponent } from './forbidden-error/forbidden-error.component';

const routes: Routes = [
  {"path":'',component:HomeComponent,canActivate:[AuthGaurdService]},
  {"path":'login',component:LoginComponent},
  {"path":'commingSoon',component:CommingSoonComponent},
  {"path":'forbidden',component:ForbiddenErrorComponent},
  {"path":'hostDetails/:superUser',component:HostDetailsComponent,canActivate:[AuthGaurdService]},
  {'path':'newPass/:page',component:NewPasswordComponent,canActivate:[AuthGaurdService]},
  {'path':'changPass/:page',component:NewPasswordComponent,canActivate:[AuthGaurdService]},
  {'path':'resetPass/:superUser',component:ResetPasswordComponent,canActivate:[AuthGaurdService]},
  {'path':'dbConn/:superUser',component:DbConnectionComponent,canActivate:[AuthGaurdService]},
  {'path':'serverRestart/:superUser',component:ServerRestartComponent,canActivate:[AuthGaurdService]},
  {'path':'serverStatus',component:ServerStatusComponent,canActivate:[AuthGaurdService]},
  {'path':'roleAccess/:admin',component:AdminRoleComponent,canActivate:[AuthGaurdService]},
  {'path':'eventReport',component:EventReportComponent,canActivate:[AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
