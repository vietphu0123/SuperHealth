import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, map } from 'rxjs';
import { AccountService } from '../_service/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Models/User';

@Injectable()
export class PatientGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {
  }
  canActivate(): Observable<boolean> {
    // return this.accountService.currentUser$.pipe(
    //   map((res:any) => {
    //     if (res.role == ('Patient')) {
    //       return true;
    //     }
    //     this.toastr.error("Login fail!");
    //     return false;
    //   })
    // )


    return this.accountService.local().pipe(
      map((res: string) => {
        const user: string = res;
        const local: any = JSON.parse(user);
        if (local) {
          try {
            if (local.user?.role !== null) {
              if (local.user?.role == ('Patient')) {
                return true;
              }
            }
          }
          catch {
            const getUser: string | any = localStorage.getItem('user');
            const localgetUser: any = JSON.parse(getUser);
            if (localgetUser) {

              if (localgetUser.user.role == 'Patient') {
                return true;
              }

            }
          }
        }
        else {
          const getUser: string | any = localStorage.getItem('user');
          const localgetUser: any = JSON.parse(getUser);
          if (localgetUser) {
            if (localgetUser?.role) {
              if (localgetUser?.role == ('Patient')) {
                return true;
              }
            }
          }
        }

        this.toastr.error("Login fail!");
        return false;
      })
    )
  }





}
