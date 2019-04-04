import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {ProfileServiceService} from '../APIs/profile-service.service';
import { AuthenticationService } from '../auth/authentication.service';
//import { $ } from 'protractor';

declare var jquery:any;
declare var bootbox:any;
declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  error = '';
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private profileServiceService:ProfileServiceService
  ) { }

  ngOnInit() {
     //this.sideNav=true;
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    console.log("login");
    this.submitted = true;
  //this.router.navigate(['']); 
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              $('.navbar-toggler,.navbar-nav,.sidebar-wrapper,#sidebar').removeAttr('hidden');
              this.loading = false;
              console.log(sessionStorage.getItem('currentUser'));
              if(sessionStorage.getItem('currentUser')==null){
                this.error="Invalid User";
              }
              else{                
                this.router.navigate(['']);
                window.location.reload();
              }     
              this.profileServiceService.setName(sessionStorage.getItem('currentUser'));   
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}
}
