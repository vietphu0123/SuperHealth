
import { Component,OnInit } from '@angular/core';
import { NgForm,FormsModule, Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, ReplaySubject, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { AccountService } from '../../_service/account.service';
import { Route, Router } from '@angular/router';
import { Register } from 'src/app/Models/Register';
import { GoogleService } from 'src/app/_service/google.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from 'firebase/auth';
import { ProvinceService } from 'src/app/_service/province.service';
import axios from 'axios';
import { PatientFileService } from 'src/app/_service/PatientFile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  validateLogin!: FormGroup;
  validateRegister!:FormGroup;
  register:Register ={userName:'',email:'',password:'',rePassword:''}
  loading:boolean=false;
  constructor(private newLogin:FormBuilder,private patientFileService:PatientFileService, private googleService:GoogleService ,private http: HttpClient,private toastr: ToastrService, private accountService: AccountService,private router:Router, private province:ProvinceService) { }
  
  ngOnInit():void{
    this.jquery();
    this.validateLogin=this.newLogin.group({
      username :['',[Validators.required,Validators.pattern]],
      password:['',[Validators.required,Validators.pattern]],
     });
     this.validateRegister=this.newLogin.group({
      usernameRegister :['',[Validators.required]],
      gmailRegister:['',[Validators.required,Validators.email]],
      passwordRegister:['',[Validators.required]],
      repasswordRegister:['',[Validators.required]],
     },
      
     );
  }
  

  submitForm(){
    console.log('hello');
    if(this.validateLogin.valid){
      this.loading=true;
      const userName = this.validateLogin.value.username;
      const password = this.validateLogin.value.password;
      console.log(userName,password);
      this.accountService.login(userName, password).subscribe
      (
        (response) => {
          this.accountService.currentUser$.subscribe(
            (value:User | any)=>{
              if(value.user.role=="Patient"){
                this.patientFileService.CheckInforDefault().subscribe((value)=>{
                  const getUser:string|any =localStorage.getItem('idDoctorTemp');
                  if(getUser){
                    const value = getUser;
                    localStorage.removeItem('idDoctorTemp');
                    this.router.navigate([`/doctorList/doctor-info/make-an-appointment/${value}`]); 
                  }
                  else{
                      this.router.navigate(["/doctor/specialty"]);
                  }
                   
                },
                (error)=>{
                  this.router.navigate(["/patient/defaultinfor"]);
                  console.log(error)
           
                })
                 
              }
              if(value.user.role=="Doctor"){
                this.router.navigate(["/doctor"]);
              }
              if(value.user.role=="Admin"){
                this.router.navigate(["/admin/index"]);
              }
            }
  
          )
        },   
        (error) => {
          this.loading=false;
          console.log(error);
          this.toastr.warning(error.error);
        }
      );
    }
    else{
      this.validateAllFormFields(this.validateLogin);
    }
     
  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAllAsTouched();
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }


  
  onRegisterSubmit(){
    if(this.validateRegister.valid){
      if(this.validateRegister.value.passwordRegister !== this.validateRegister.value.repasswordRegister){
        this.toastr.error("Mật khẩu không trùng nhau");
        this.validateRegister.reset();
        return;
         
      }
      this.register.userName = this.validateRegister.value.usernameRegister;
      this.register.email = this.validateRegister.value.gmailRegister;
      this.register.password = this.validateRegister.value.passwordRegister;
      this.register.rePassword = this.validateRegister.value.repasswordRegister;
      console.log(this.register);
      this.accountService.Register(this.register).subscribe(
         (response)=>{

          this.validateRegister.reset();
          this.toastr.success(response.message);
          this.router.navigate(["/login"]);
        },
        error =>{
          this.toastr.error(error.error.message);
        }
        

      )
  
    }
    else{
      this.validateAllFormFields(this.validateRegister);
    }
     
  }

  tryGoogleLogin(){
    this.googleService.GoogleAuth();
  }



  makeApiRequest(token : string) {
    const accessToken = token; // Replace with your actual access token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    
    this.http.get('https://localhost:7000/api/City', { headers })
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  jquery(){
    $(".body_container-login-Login_bnt a").click(function(event){
      event.preventDefault();
      $(".body_container-login_form_Login").show(); 
      $(".body_container-login_form_SignUp").hide();
      $(".body_container-login_SignUp").show();
      $(".body_container-login-Login_bnt a").css('color','rgb(13,110,253)')
      $(".body_container-login-SignUp_bnt a").css('color','black')
      $(".body_container-login-SignUp_bnt a").css('border-bottom','none')
      $(".body_container-login-Login_bnt a").css('border-bottom','2px solid rgb(24,144,255)')
       
  });
  $(".body_container-login-SignUp_bnt a").click(function(event){
      event.preventDefault();
      $(".body_container-login_form_Login").hide();
      $(".body_container-login_form_SignUp").show();
      $(".body_container-login_SignUp").hide();
      $(".body_container-login-Login_bnt a").css('color','black')
      $(".body_container-login-SignUp_bnt a").css('color','rgb(13,110,253)')
      $(".body_container-login-SignUp_bnt a").css('border-bottom','2px solid rgb(24,144,255)')
      $(".body_container-login-Login_bnt a").css('border-bottom','none')
       
  });
  }
}