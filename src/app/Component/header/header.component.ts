import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error, map } from 'jquery';
import { Observable } from 'rxjs';
import { PatientFileService } from 'src/app/_service/PatientFile.service';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: string = '';
  showMe: boolean = false;
  patientInfor:any = {};
  constructor(private patientFileService:PatientFileService, private account: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.GetPatientInfor();
    this.account.local().subscribe(
      (value) => {
        if (value) {
          this.showMe = true
          // console.log("hellooo");
        }
        this.user = value
      });

  }

  handleClick(): void {

    this.account.logout();
    this.router.navigate(['/login']);

  }
  GetPatientInfor(){
    this.patientFileService.CheckInforDefault().subscribe((value)=>{
     this.patientInfor=value.data
   },(error)=>{console.log(error.error)});
 }

 ChangeData(){

 }


}

