import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


// end Material

import { LOCALE_ID, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component'
import { FooterComponent } from './Component/footer/footer.component'
import { HeaderComponent } from './Component/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PatientProfileComponent } from './Component/patient-profile/patient-profile.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PatientGuard } from './_guards/PatientGuard';
import { DoctorGuard } from './_guards/DoctorGuard';
import { AdminGuard } from './_guards/AdminGuard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorComponent } from './Component/doctor/doctor.component';
import { CommonModule } from '@angular/common';
import { MyCanLoadGuard } from './_guards/MyCanLoadGuard'
import { PageReloadService } from './_service/PageReloadService';
import { IndexComponent } from './Component/admin/index/index.component';
import { BaseAdminComponent } from './Component/admin/base-admin/base-admin.component';
import { SpecialtyListComponent } from './Component/admin/specialty/specialty-list/specialty-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditSpecialtyComponent } from './Component/admin/specialty/add-edit-specialty/add-edit-specialty.component';
import { DeleteSpecialtyComponent } from './Component/admin/specialty/delete-specialty/delete-specialty.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { DoctorListComponent } from './Component/doctor-list/doctor-list.component';
import { DoctorInfoComponent } from './Component/doctor-info/doctor-info.component';
import { DoctorBookingComponent } from './Component/doctor-booking/doctor-booking.component';
import {  DoctorPatientAppointmentComponent } from './Component/doctorPage/doctor-patient-appointment/doctor-patient-appointment.component';
import { DoctorPatientListComponent } from './Component/doctorPage/doctor-patient-list/doctor-patient-list.component';
import { DoctorProfileSettingComponent } from './Component/doctorPage/doctor-profile-setting/doctor-profile-setting.component';
import { DoctorScheduleComponent } from './Component/doctorPage/doctor-profile-setting/doctor-schedule/doctor-schedule.component';
import { HomeComponent } from './Component/admin/home/home.component';
import { AdminDoctorListComponent } from './Component/admin/doctor/admin-doctor-list/admin-doctor-list.component';
import { AddAdminDoctorComponent } from './Component/admin/doctor/add-admin-doctor/add-admin-doctor.component';
import { AppointmentListComponent } from './Component/admin/appointment/list-appointment/list-appointment.component';
import {  PositionListComponent } from './Component/admin/position/position-list/position-list.component';
import { AddEditPositionComponent } from './Component/admin/position/add-edit-position/add-edit-position.component';
import { DeletePositionComponent } from './Component/admin/position/delete-position/delete-position.component';
import { DoctorSpecialtyComponent } from './Component/doctorPage/doctor-specialty/doctor-specialty.component';
import { PatientListComponent } from './Component/admin/patient/patient-list/patient-list.component';
import {  QuickBookingComponent } from './Component/quick-booking/quick-booking.component';
import { ChangePasswordDoctorComponent } from './Component/admin/doctor/change-password-doctor/change-password-doctor.component';
import { AccountProfileComponent } from './Component/patient/home-profile/account-profile/account-profile.component';
import { DashboardProfileComponent } from './Component/patient/home-profile/dashboard-profile/dashboard-profile.component';
import { InforProfileComponent } from './Component/patient/home-profile/infor-profile/infor-profile.component';
import { PaymentProfileComponent } from './Component/patient/home-profile/payment-profile/payment-profile.component';
import { ScheduleProfileComponent } from './Component/patient/home-profile/schedule-profile/schedule-profile.component';
import { ScheduleresultComponent } from './Component/patient/home-profile/schedule-profile/scheduleresult/scheduleresult.component';
import { InforresultComponent } from './Component/patient/home-profile/infor-profile/inforresult/inforresult.component';
import { InfornewComponent } from './Component/patient/home-profile/infor-profile/infornew/infornew.component';
import { PatientAppointmentComponent } from './Component/patient-appointment/patient-appointment.component';
import { ListRecyclePositionComponent } from './Component/admin/RecycleBin/position/list-recycle-position/list-recycle-position.component';
import { RestoreRecyclePositionComponent } from './Component/admin/RecycleBin/position/restore-recycle-position/restore-recycle-position.component';
import { RestoreRecycleSpecialtyComponent } from './Component/admin/RecycleBin/specialty/restore-recycle-specialty/restore-recycle-specialty.component';
import {  ListRecycleSpecialtyComponents } from './Component/admin/RecycleBin/specialty/list-recycle-specialty/list-recycle-specialty.component';
import { TimeFrameBookingComponent } from './Component/time-frame-booking/time-frame-booking.component';
import { AppointmentComponent } from './Component/appointment/appointment.component';
import { DefaultInforComponent } from './Component/patient/default-infor/default-infor.component';
import { ListdoctorComponent } from './Component/patient/listdoctor/listdoctor.component';
import { EditAdminDoctorComponent } from './Component/admin/doctor/edit-admin-doctor/edit-admin-doctor.component';
import { ViewAdminDoctorComponent } from './Component/admin/doctor/view-admin-doctor/view-admin-doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    DoctorComponent,
    PatientProfileComponent,
    PatientProfileComponent,
    AccountProfileComponent,
    DashboardProfileComponent,
    InforProfileComponent,
    PaymentProfileComponent,
    ScheduleProfileComponent,
    ScheduleresultComponent,
    InforProfileComponent,
    InforresultComponent,
    InfornewComponent,
    DoctorComponent,
    HomeComponent,



    // admin
    AdminDoctorListComponent,
    AddAdminDoctorComponent,
    AppointmentListComponent,

    IndexComponent,
    BaseAdminComponent,
    SpecialtyListComponent,
    AddEditSpecialtyComponent,
    DeleteSpecialtyComponent,

    DoctorListComponent,
    DoctorInfoComponent,
    DoctorBookingComponent,
    DoctorPatientAppointmentComponent,
    DoctorPatientListComponent,
    DoctorProfileSettingComponent,
    DoctorScheduleComponent,
    // DeleteAdminDoctorComponent,
    ChangePasswordDoctorComponent,
    QuickBookingComponent,
    TimeFrameBookingComponent,
    DoctorSpecialtyComponent,
    PositionListComponent,
    AddEditPositionComponent,
    DeletePositionComponent,
    PatientListComponent,
    PatientAppointmentComponent,

    //RecycleBin Admin
    ListRecyclePositionComponent,
    RestoreRecyclePositionComponent,
    ListRecycleSpecialtyComponents,
    RestoreRecycleSpecialtyComponent,
    AppointmentComponent,
    DefaultInforComponent,
    ListdoctorComponent,
    EditAdminDoctorComponent,
    ViewAdminDoctorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxPaginationModule, // phan trang
    JwtModule,

    //Material
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    //end material

    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [PatientGuard, DoctorGuard, AdminGuard, MyCanLoadGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'vi' } // thêm tiếng việt
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
