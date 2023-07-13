import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit{
  
  constructor(private account:AccountService, private router:Router){

  }
  ngOnInit(): void {
    const currentUrl = this.router.url;
    const splitURL = currentUrl.split("/");
    const valueUrl = splitURL.slice(-1)[0];
    if(valueUrl==="schedule"){
      $(".medical_examination_schedule").css('background-color','rgb(243,244,246)');
      $(".medical_examination_schedule").addClass('hide-before');
    }
    if(valueUrl==="payment"){
      $(".history_pay").css('background-color','rgb(243,244,246)');
      $(".history_pay").addClass('hide-before');
    }
    if(valueUrl==="infor"){
      $(".file").css('background-color','rgb(243,244,246)');
      $(".file").addClass('hide-before');
    }
    if(valueUrl==="account"){
      $(".account").css('background-color','rgb(243,244,246)');
      $(".account").addClass('hide-before');
    }
  }

  handleClick(): void {

    this.account.logout();
    this.router.navigate(['/login']);

  }
}
