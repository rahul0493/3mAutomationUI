import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate  {

  constructor(private router:Router,private routeParams:ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    if (sessionStorage.getItem('currentUser')) {
        // logged in so return true
        console.log(JSON.parse(sessionStorage.getItem('currentUser')));
        var roles=JSON.parse(sessionStorage.getItem('currentUser')); 
        roles=roles.roles; 
        var resAdmin=roles.find(x => x.role === "ADMIN");
        var ressuperUser=roles.find(x => x.role === "SUPER_USER");
        if(route.params.superUser=="superUser"){         
          if(resAdmin!=undefined||ressuperUser!=undefined){
            return true;
          }
          else{
            this.router.navigate(['/forbidden'],{ queryParams: { returnUrl: state.url }});
            return false;
          }
        }  
        else if(route.params.admin=="admin"){
          if(resAdmin!=undefined){
            return true;
          }
          else{
            this.router.navigate(['/forbidden'],{ queryParams: { returnUrl: state.url }});
            return false;
          }
        }   
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
}
}
