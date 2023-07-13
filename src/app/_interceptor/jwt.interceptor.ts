import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from '../_service/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private accountService: AccountService, private toaster: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userLocal: string | any = localStorage.getItem('user');
    if (userLocal) {
      let userValue = (JSON.parse(userLocal))
      if (userValue.user?.token && !this.jwtHelper.isTokenExpired(userValue.user?.token)) {
        if (userValue.user.token) {
          const headers = new HttpHeaders()
            .set('access-token', userValue.user.token)
            .set('Authorization', 'Bearer ' + userValue.user.token);

          const reqWithToken = request.clone({
            headers: headers,
          });
          return next.handle(reqWithToken);
        } else {
          // Request unverändert weitergeben
          return next.handle(request);
        }
      }
      else {
        this.accountService.logout();
        this.toaster.show("hết phiên làm việc");
      }

    }
    return next.handle(request);
  }
}
