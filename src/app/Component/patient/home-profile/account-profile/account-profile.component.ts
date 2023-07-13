import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
 
import { Patient } from 'src/app/Models/Patient';
import { PatientFileService } from 'src/app/_service/PatientFile.service';
import { AccountService } from 'src/app/_service/account.service';
import { PatientService } from 'src/app/_service/patient.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit{
  
  constructor(private patientService:PatientService,private patientFileService:PatientFileService,private toast:ToastrService,private accountService:AccountService,private router:Router){
    
  }
    
  password:string='';
  repassword:string='';

  patientInfor:any = {};

  // patientInfor :Patient={
  //   id: '',
  //   userId: '---',
  //   patientName: '---',
  //   phoneNumber: '---',
  //   address: '---',
  //   image: '---',
  //   gender: 0,
  //   dateOfBirth:new Date(0, 0, 0),
  //   bhyt: '---',
  //   cmnd: '---',
  //   ethnicity: '---'
  // };

  ngOnInit(): void {
    this.GetPatientInfor();
   
  }
  
  GetPatientInfor(){
     this.patientFileService.CheckInforDefault().subscribe((value)=>{
      this.patientInfor=value.data
      console.log(value);
    });
  }

  onSubmit(form:NgForm){
    const changePass={
      password:this.password,
      rePassword:this.repassword
    };
    console.log(changePass);
    this.patientService.ChangePassword(changePass).subscribe(
      ()=>{
        this.toast.success("Thành Công");
        this.accountService.logout();
        this.router.navigate(['/login']);
      }
      ,
      (error)=>{
        this.password='';
        this.repassword='';
        console.log(error);
        this.toast.error(error.error);
      }
    )
  }

}
