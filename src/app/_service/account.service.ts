import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { Observable,ReplaySubject,catchError,throwError,map } from 'rxjs';
import { Register } from '../Models/Register';
import { User } from '../Models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import * as auth from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private sourceInternal = new ReplaySubject<any>(1);
  currentUser$ = this.sourceInternal.asObservable();
  
  private helper = new JwtHelperService();
  
  constructor(private hhtp : HttpClient,private router:Router ,private afAuth:AngularFireAuth) { }


  local():Observable<any>{
    const _sourceInternal = new ReplaySubject<any>(1);
    const _currentUser$ = _sourceInternal.asObservable();
    _sourceInternal.next(localStorage.getItem("user"));
    return _currentUser$;
  }

   login(username: string, password: string) : Observable<any> {
    const url = 'https://localhost:7000/api/Login';
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.hhtp.post<User>(url,JSON.stringify(body), { headers }).pipe(
      map((res:User)=>{
        if(res){ 
          this.setCurrentUser(res);
          
      }})

      
    ); 
  }

  loginWithSocial(emailGoogle: string, displayName: string) : Observable<any> {
    const url = 'https://localhost:7000/api/LoginSocial';
    const body = { emailGoogle, displayName };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.hhtp.post<User>(url,JSON.stringify(body), { headers }).pipe(
      map((res:User)=>{
        if(res){ 
          this.setCurrentUser(res);
          
      }})

      
    ); 
  }


  Register(register:Register):Observable<any>{
    const url = 'https://localhost:7000/api/Register';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.hhtp.post<any>(url,register, { headers }); 
  }


  logout():void{
    localStorage.clear();
    this.router.navigate(["/login"]);
  }


  async setCurrentUser(users: User){
    if(users){
        await localStorage.setItem('user', JSON.stringify(users));  
        await this.sourceInternal.next(users); 
     
    }      
  }

  async getDecodedToken(token: string) {  
    return this.helper.decodeToken(token);
  }
 
  
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        console.log(res);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

}
