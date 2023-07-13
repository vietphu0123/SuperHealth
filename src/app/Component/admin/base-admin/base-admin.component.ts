import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.css', '../../../../assets/css/sb-admin-2.min.css']
})
export class BaseAdminComponent implements OnInit {
  user: string = '';
  showMe: boolean = false;
  constructor(private account: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.account.local().subscribe(
      (value) => {
        if (value) {
          this.showMe = true
          console.log("hellooo");
        }
        this.user = value
      });

  }
  handleClick(): void {

    this.account.logout();
    this.router.navigate(['/login']);

  }
}
