import { Injectable, NgZone } from '@angular/core';
import { User } from '../Models/UserGoogle';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { PatientFileService } from './PatientFile.service';
import { LoginComponent } from '../Component/login/login.component';
@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  userData: any; 
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone,
    private accountService : AccountService,
    private patientFileService:PatientFileService,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */


    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.patientFileService.CheckInforDefault().subscribe((value)=>{
              this.router.navigate(["/doctor/specialty"]);
            },
            (error)=>{
              this.router.navigate(["/patient/defaultinfor"]);
            })
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    
    return this.AuthLogin(new auth.GoogleAuthProvider(), firebase.auth.Auth.Persistence.NONE)
    .then((res: any) => {
 
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any, persistenceOption: any) {
    return firebase.auth()
    .setPersistence(persistenceOption)
    .then(() => {
      const customParameters = {
        prompt: 'select_account',
      };

      const signInOptions = new firebase.auth.GoogleAuthProvider();
      signInOptions.setCustomParameters(customParameters);

      return firebase.auth().signInWithPopup(signInOptions)
        .then((result:any) => {
          console.log(result.user.displayName,result.user.email);
          this.accountService.loginWithSocial(result.user.email,result.user.displayName)
          .subscribe((res)=>{
            this.patientFileService.CheckInforDefault().subscribe((value)=>{
                 
              const getUser:string|any =localStorage.getItem('idDoctorTemp');
                  if(getUser){
                    const value = getUser;
                    localStorage.removeItem('idDoctorTemp');
                    this.router.navigate([`/doctorList/doctor-info/make-an-appointment/${value}`]); 
                  }
                  else{
                      this.router.navigate(["/patient/profile/infor"]);
                  }
            },
            (error)=>{
              this.router.navigate(["/patient/defaultinfor"]);
              console.log(error)
       
            })
          })

        })
        .catch((error) => {
          window.alert(error);
        });
    })
    .catch((error) => {
      window.alert(error);
    });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}