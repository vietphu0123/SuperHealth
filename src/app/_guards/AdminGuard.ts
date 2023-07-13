import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, map } from 'rxjs';
import { AccountService } from '../_service/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {
  }
  canActivate(): Observable<boolean> {
    return this.accountService.local().pipe(
      map((res: string) => {
        const user: string = res;
        const local: any = JSON.parse(user);
        if(local){
          if (local.role == ('Admin')) {
            return true;
          }
        }
        const getUser: string | any = localStorage.getItem('user');
        const localgetUser: any = JSON.parse(getUser);
        if (localgetUser) {
          if (localgetUser.user.role == 'Admin') 
          {
            return true;
          }

         }
        return false;
      })
    )
  }

}