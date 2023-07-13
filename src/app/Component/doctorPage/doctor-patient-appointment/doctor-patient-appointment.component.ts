import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { PatientService } from 'src/app/_service/patient.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_service/account.service';
import { DoctorInforDetail } from '../models/DoctorInforDetail';
import { DoctorSpecialty } from '../models/DoctorSpecialty';
import { Appointment } from '../../admin/models/appointment';
import { appointmentService } from 'src/app/_service/appointment.service';
import { PatientDetail } from '../models/PatientDetail';
import { TimeFrameService } from 'src/app/_service/time-frame.service';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-doctor-patient-appointment',
  templateUrl: './doctor-patient-appointment.component.html',
  styleUrls: ['./doctor-patient-appointment.component.css'],
})
export class DoctorPatientAppointmentComponent {
  patients: PatientDetail[] = [];


  doctorDetail: DoctorInforDetail = {
    doctorId: '',
    doctorName: '',
    phoneNumber: '',
    address: '',
    avatar: '',
    gender: '',
    numberOfExaminations: '',
    status: '',
    positionId: '',
    positionName: '',
    dateOfBirth: '',
    email: '',
    userName: '',
    province: '',
    district: '',
    ward: ''
  };
  doctorSpecialty: DoctorSpecialty[] = [];
  specialtyDetail: any = {
    specialtyId: '',
    image: '',
    specialtyName: '',
  };

  appointmentList: any = [];

  appointmentDetails: any = {
    id: '',
    doctorName: '',
    timeSlot: '',
    date: '',
    patientNameF: '',
    phoneNumber: '',
    dateOfBirthF: '',
    genderF: '',
    patientAddressF: '',
    doctorAddress: '',
    reason: '',
    bhytf: '',
    appointmentCode: '',
    avatar: '',
    doctorPhoneNumber: '',
    phoneNumberF:''
  };
  appointment: any = {
    id: '',
    status:''
  };
  total: number = 0;
  pageSize: number = 3;
  pageSizes = [3, 6, 9];
  page: number = 1;
  status: number = 2;
  search = '';

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: appointmentService,
    private timeFrameService: TimeFrameService, 
    private dataService: DataService
  ) {}
  GetRequestParams(status: number, search: string, page: number, pageSize: number) {
    let params: any = {};
    if (status) {
      params[`status`] = status;
    }
    if (search) {
      params[`search`] = search;
    }

    if (page) {
      params[`page`] = page;
    }

    if (pageSize) {
      params[`pageSize`] = pageSize;
    }

    return params;
  }

  getAllPatientsPending() {
    const params = this.GetRequestParams(this.status,this.search, this.page, this.pageSize);

    this.doctorService.GetDoctorDetail().subscribe((value) => {
      this.doctorDetail = value;

      this.patientService
        .getAllPatientsAppointment(this.doctorDetail.doctorId, params)
        .subscribe({
          next: (response: any) => {
            // console.log(response);
            this.patients = response.dataList;
            this.total = response.pageSize * response.totalPage;
            this.pageSize = response.pageSize;
            console.log(response.dataList); 
          }
        });
      // this.doctorService.GetInforDoctorSpecialty().subscribe((value) => {
      //   this.doctorSpecialty = value;
      //   // console.log(value);
      // });
 
    });
  }
  ngOnInit(): void {
    this.getAllPatientsPending();
    // console.log('User'+this.accountService.local());
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllPatientsPending();
  }
  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.getAllPatientsPending();   
  }
  pageChange(event: number) {
    this.page = event;
    this.getAllPatientsPending();
  }

  receivedData: any;
  timeFrameList: any = []
// GetAllTimeFrame(){
  
//   this.dataService.getData().subscribe(data => {
//     this.receivedData = data;
//     console.log(data);
    
//     this.timeFrameService.GetTimeFrameBySchedule(this.receivedData).subscribe({
//       next: (response) => {
//         // console.log(response);
        
//         // if (response.code == 200) { 
//           this.timeFrameList = response.dataList
//         //   console.log(response); 
//         // } else {
//         //   this.timeFrameList = null
//         // }
//         // console.log(this.timeFrameList)
//       }
//     })
//   });
// }
  handlePageChange(event: number): void {
    this.page = event;
    this.getAllPatientsPending();
    
  } 

  //show detail
  openViewAppointment(id: any) {
    this.appointmentList.id = id;
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (response: any) => {
        this.appointmentDetails = response.data[0];
        // console.log(response);
      },
    });
  }

  DoctorApproved(id: any) {
    this.patients = [];
    this.appointment.id = id;
    this.doctorService.DoctorApproved(this.appointment).subscribe({
      next: (response: any) => {
        // this.appointmentDetails = response.data[0];
        // console.log(response);
        const params = this.GetRequestParams(this.status,this.search, this.page, this.pageSize);
        this.patientService
        .getAllPatientsAppointment(this.doctorDetail.doctorId, params)
        .subscribe({
          next: (response: any) => {
            // console.log(response);
            this.patients = response.dataList;
            this.total = response.pageSize * response.totalPage;
            this.pageSize = response.pageSize;
          },
        });
      },
      error:(response: any) =>{

      }
    });
    // window.location.reload();
  }

  DoctorCancelled(id: any) {
    this.patients = [];
    this.appointment.id = id;
    this.doctorService.DoctorCancelled(this.appointment).subscribe({
      next: (response: any) => {
        // this.appointmentDetails = response.data[0];
        // console.log(response);
        const params = this.GetRequestParams(this.status,this.search, this.page, this.pageSize);
        this.patientService
        .getAllPatientsAppointment(this.doctorDetail.doctorId, params)
        .subscribe({
          next: (response: any) => {
            // console.log(response);
            this.patients = response.dataList;
            this.total = response.pageSize * response.totalPage;
            this.pageSize = response.pageSize;
          },
        });
      },
      error:(response: any) =>{

      }
    });
    // window.location.reload();
  }
}
