import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { AccountService } from "../_service/account.service";
import { ToastrService } from "ngx-toastr";
import { Observable, map, of } from "rxjs";

@Injectable()
export class MyCanLoadGuard implements CanLoad, CanActivate {

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return of(false);
  }

  canActivate(): Observable<boolean> {
    return this.accountService.local().pipe(
      map((res: string) => {
        const user: string = res;

        if (user) {
          const local: any = JSON.parse(user);
          if (local.role == ('Patient')) {
            this.router.navigate(["/patient_profile"])
            return false;
          }
          if (local.role == ('Doctor')) {
            this.router.navigate(["/doctor"])
            return false;
          }
          if (local.role == ('Admin')) {
            this.router.navigate(["admin/index"])
            return false;
          }
        }
        const getUser: string | any = localStorage.getItem('user');
        const localgetUser: any = JSON.parse(getUser);
        if (localgetUser) {
          if (localgetUser.user.role == 'Patient') 
          {
            this.router.navigate(["/doctor/specialty"])
            return false;
          }
          if (localgetUser.user.role == 'Doctor') 
          {
            this.router.navigate(["/doctor"])
            return false;
          }
          if (localgetUser.user.role == 'Admin') 
          {
            this.router.navigate(["admin/index"])
            return false;
          }

         }


        return true;
      })
    )
  }
}