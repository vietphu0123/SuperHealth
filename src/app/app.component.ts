import { Component, HostListener } from '@angular/core';
import { User } from './Models/User';
import { Router } from '@angular/router';
import { AccountService } from './_service/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    window.location.reload();
  }

  constructor(private router: Router, private accountService: AccountService) {

  }

  ngOnInit(): void {
    // this.setCurrentUser();
    // // console.log("vietnam");
  }

  // setCurrentUser() {
  //   const use: string | any = localStorage.getItem('user');
  //   const user: User = JSON.parse(use);
  //   if (user) {
  //     this.accountService.setCurrentUser(user);
  //     // console.log('hello');

  //   } else {
  //     this.router.navigateByUrl('login');
  //     // console.log('hello1');
  //   }
  // }


}
