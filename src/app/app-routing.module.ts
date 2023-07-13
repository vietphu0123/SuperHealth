import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { PatientProfileComponent } from './Component/patient-profile/patient-profile.component';
import { PatientGuard } from './_guards/PatientGuard';
import { DoctorComponent } from './Component/doctor/doctor.component';
import { DoctorGuard } from './_guards/DoctorGuard';
import { MyCanLoadGuard } from './_guards/MyCanLoadGuard';

import { AdminGuard } from './_guards/AdminGuard';
import { IndexComponent } from './Component/admin/index/index.component';
import { BaseAdminComponent } from './Component/admin/base-admin/base-admin.component';
import { SpecialtyListComponent } from './Component/admin/specialty/specialty-list/specialty-list.component';
import { DoctorListComponent } from './Component/doctor-list/doctor-list.component';
import { DoctorInfoComponent } from './Component/doctor-info/doctor-info.component';
import { DoctorBookingComponent } from './Component/doctor-booking/doctor-booking.component';
import { DoctorProfileSettingComponent } from './Component/doctorPage/doctor-profile-setting/doctor-profile-setting.component';
import { DoctorPatientAppointmentComponent } from './Component/doctorPage/doctor-patient-appointment/doctor-patient-appointment.component';
import { DoctorScheduleComponent } from './Component/doctorPage/doctor-profile-setting/doctor-schedule/doctor-schedule.component';
import { DoctorPatientListComponent } from './Component/doctorPage/doctor-patient-list/doctor-patient-list.component';
import { AdminDoctorListComponent } from './Component/admin/doctor/admin-doctor-list/admin-doctor-list.component';
import { DashboardProfileComponent } from './Component/patient/home-profile/dashboard-profile/dashboard-profile.component';
import { ScheduleProfileComponent } from './Component/patient/home-profile/schedule-profile/schedule-profile.component';
import { PaymentProfileComponent } from './Component/patient/home-profile/payment-profile/payment-profile.component';
import { InforProfileComponent } from './Component/patient/home-profile/infor-profile/infor-profile.component';
import { AccountProfileComponent } from './Component/patient/home-profile/account-profile/account-profile.component';
import { DoctorSpecialtyComponent } from './Component/doctorPage/doctor-specialty/doctor-specialty.component';
import { AppointmentListComponent } from './Component/admin/appointment/list-appointment/list-appointment.component';
import { PositionListComponent } from './Component/admin/position/position-list/position-list.component';
import { PatientListComponent } from './Component/admin/patient/patient-list/patient-list.component';
import { PatientAppointmentComponent } from './Component/patient-appointment/patient-appointment.component';
import { ListRecyclePositionComponent } from './Component/admin/RecycleBin/position/list-recycle-position/list-recycle-position.component';
import { ListRecycleSpecialtyComponents } from './Component/admin/RecycleBin/specialty/list-recycle-specialty/list-recycle-specialty.component';
import { AppointmentComponent } from './Component/appointment/appointment.component';
import { DefaultInforComponent } from './Component/patient/default-infor/default-infor.component';
import { ListdoctorComponent } from './Component/patient/listdoctor/listdoctor.component';

const routes: Routes =
  [
    { path: '', redirectTo: '/doctor/specialty', pathMatch: 'full' },
    // { path: 'login', component: LoginComponent, canActivate: [MyCanLoadGuard] },
    //{ path: 'patient_profile', component: PatientProfileComponent, canActivate: [PatientGuard] },
    // { path: 'doctor', component: DoctorComponent, canActivate: [DoctorGuard] },
    {
      path: 'admin',
      component: BaseAdminComponent,
      canActivate: [AdminGuard],
      children: [
        { path: 'index', component: IndexComponent },
        { path: 'specialty/list', component: SpecialtyListComponent },
        { path: 'doctor/list', component: AdminDoctorListComponent },
        { path: 'appointment/list', component: AppointmentListComponent },
        { path: 'position/list', component: PositionListComponent },
        { path: 'patient/list', component: PatientListComponent },

        //Recycle Bin
        { path: 'recycleBin/listRecyclePosition', component: ListRecyclePositionComponent },
        { path: 'recycleBin/listSpecaltyPosition', component: ListRecycleSpecialtyComponents },


      ]
    },
    //doctorList
    { path: 'doctorList', component: DoctorListComponent },
    { path: 'doctorList/doctorInfo/:id', component: DoctorInfoComponent },
    { path: 'doctorBooking/:id', component: DoctorBookingComponent },
    { path: 'login', component: LoginComponent, canActivate: [MyCanLoadGuard] },
    { path: 'doctorList/doctor-info/make-an-appointment/:id', component: AppointmentComponent },
    {
      path: 'patient/profile', component: DashboardProfileComponent, canActivate: [PatientGuard], children: [
        { path: 'schedule', component: ScheduleProfileComponent },
        { path: 'payment', component: PaymentProfileComponent },
        { path: 'infor', component: InforProfileComponent },
        { path: 'account', component: AccountProfileComponent },
      ]
    },
    // doctor
    { path: 'doctor/setting', component: DoctorProfileSettingComponent, canActivate:[DoctorGuard] },
    { path: 'doctor', component: DoctorPatientAppointmentComponent , canActivate:[DoctorGuard]},
    { path: 'doctor/schedule', component: DoctorScheduleComponent , canActivate:[DoctorGuard]},
    { path: 'doctor/patientList', component: DoctorPatientListComponent , canActivate:[DoctorGuard]},
    { path: 'doctor/specialty', component: DoctorSpecialtyComponent },
    // đặt khám - bệnh nhân
    { path: 'dat-kham/bac-si', component: ListdoctorComponent },
    { path: 'dat-kham/:id', component: PatientAppointmentComponent ,canActivate: [PatientGuard]},
    { path: 'patient/defaultinfor', component: DefaultInforComponent, canActivate: [PatientGuard] },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
