import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProfileServiceService} from './APIs/profile-service.service';
// import {SpinnerService} from './auth/spinner.service';

import { Subject } from 'rxjs';
import { Idle } from 'idlejs/dist';
//import { setTimeout } from 'timers';
import { timeout } from 'rxjs/operators';
import { NgNoValidate } from '@angular/forms/src/directives/ng_no_validate_directive';
import { longStackSupport } from 'q';

import {SpinnerService} from './auth/spinner.service';
import {LoaderState } from'./auth/loaderState.model';
import { Subscription } from 'rxjs';

declare var jquery:any;
declare const $: any;
declare var bootbox:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
profileName:String;
navBars:Boolean;
isAdmin:Boolean;
isNgg:Boolean;
isEai:Boolean;
isTransport:Boolean;
isDom:Boolean;
show:Boolean;
isSuperUser:Boolean;

constructor(private ProfileServiceService: ProfileServiceService, private routeParams: ActivatedRoute, private router: Router, private spinner: SpinnerService) { 
	this.show = false;
	const idle = new Idle()
		.whenNotInteractive()
		.within(10)
		.do(() => {
			console.log('IDLE');
			sessionStorage.clear();
			sessionStorage.clear();
			this.ProfileServiceService.setName(sessionStorage.getItem('currentUser'));
			this.router.navigate(['login']);

		})
		.start();
	this.ProfileServiceService.setNameMethodCalled.subscribe((res) => {
		if (res == null) {
			this.navBars = false;
		} else {
			this.profileName = res.displayName;
			this.navBars = true;

		}
	});
	this.spinner.loaderState
		.subscribe((state: LoaderState) => {
			this.show = state.show;
			//console.log('spinned');
		});
}

title = 'dashboard3M';

ngOnInit() {

	this.ProfileServiceService.setName(sessionStorage.getItem('currentUser'));
	var roles = JSON.parse(sessionStorage.getItem('currentUser'));
	if (roles != null) {
		roles = roles.roles;
		var resAdmin = roles.find(x => x.role === "ADMIN");
		var resNgg = roles.find(x => x.role === "NGG_USER");
		var resEai = roles.find(x => x.role === "EAI_USER");
		var resTran = roles.find(x => x.role === "TRANSPORT_USER");
		var resDom = roles.find(x => x.role === "DOM_USER");
		var resSuser = roles.find(x => x.role === "SUPER_USER");
		if (resNgg != undefined) {
			this.isNgg = true;
		} else {
			this.isNgg = false;
		}
		if (resDom != undefined) {
			this.isDom = true;
		} else {
			this.isDom = false;
		}
		if (resTran != undefined) {
			this.isTransport = true;
		} else {
			this.isTransport = false;
		}
		if (resEai != undefined) {
			this.isEai = true;
		} else {
			this.isEai = false;
		}
		if (resSuser != undefined) {
			this.isSuperUser = true;
		} else {
			this.isSuperUser = false;
		}
		if (resAdmin != undefined) {
			this.isAdmin = true;
			this.isNgg = true;
			this.isDom = true;
			this.isEai = true;
			this.isTransport = true;
			this.isSuperUser = true;
		} else {
			this.isAdmin = false;
		}
	}
}

logout() {
	bootbox.confirm({
		size: "small",
		message: "Are you sure, you want to logout",
		callback: (result) => {
			if (result == true) {
				sessionStorage.clear();
				this.ProfileServiceService.setName(sessionStorage.getItem('currentUser'));
				this.router.navigate(['login']);
			}
		}
	});
}
}