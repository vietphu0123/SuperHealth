import { ScheduleService } from 'src/app/_service/schedule/schedule.service';
import { Schedule } from './../../models/Schedule';
import { Component, OnInit } from '@angular/core';
import { DoctorInforDetail } from '../../models/DoctorInforDetail';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { DoctorSpecialty } from '../../models/DoctorSpecialty';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: [
    './doctor-schedule.component.css',
    '../../../../../assets/css/sb-admin-2.min.css'
  ],
})
export class DoctorScheduleComponent implements OnInit {
  schedules: Schedule[] = [];
  schedulesRequest: Schedule = {
    id: '',
    subTime: '',
    workingDay: '',
    startTime: '',
    endTime: '',
    examinationFee: '',
    status: '',
    doctorId: '',
  };
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
  currentSchedule: Schedule = {
    id: '',
    subTime: '',
    workingDay: '',
    startTime: '',
    endTime: '',
    examinationFee: '',
    status: '',
    doctorId: '',
  };
  doctorSpecialty: DoctorSpecialty[] = [];
  specialtyDetail: any = {
    specialtyId: '',
    image: '',
    specialtyName: '',
  };

  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  constructor(
    private scheduleService: ScheduleService,
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private router: Router

  ) {

  }
  GetRequestParams(search: string, page: number, pageSize: number) {
    let params: any = {}
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
  GetAllSchedule(){
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.doctorService.GetDoctorDetail().subscribe((value) => {
      this.doctorDetail = value;
      this.scheduleService
      .GetCurrentSchedule(this.doctorDetail.doctorId)
      .subscribe((value: any) => {
        this.currentSchedule = value.data;
        console.log(value);
      });
      this.scheduleService
        .GetAllScheduleOfDoctor(this.doctorDetail.doctorId, params)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.schedules = response.dataList;
            this.total = response.pageSize * response.totalPage
        this.pageSize = response.pageSize
          },
        });
      // console.log(value);
    });
  }

  ngOnInit(): void {
    this.GetAllSchedule();
    this.doctorService.GetInforDoctorSpecialty().subscribe((value) => {
      this.doctorSpecialty = value;
      
      // console.log(value);
    });
 
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetAllSchedule();
  }
  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetAllSchedule();
  }
  pageChange(event: number) {
    this.page = event;
    this.GetAllSchedule();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetAllSchedule();
  }
  addSchedule() {
    // console.log(this.schedulesRequest);
    this.scheduleService.addSchedule(this.schedulesRequest).subscribe({
      next: (schedule: any) => {
        if(schedule.code == 200){
          this.toastr.success(schedule.message);
        }else if(schedule.code == 500){
          this.toastr.error(schedule.message);
        }
       
        this.GetAllSchedule();
      },
      error: (response: any) => {
        this.toastr.error(response.message);
      },
    });
  }
  UpdateSchedule() {
    this.scheduleService
      .UpdateScheduleReqInfor(this.schedulesRequest)
      .subscribe({
        next: (response: any) => {
            this.toastr.success(response.message);
            this.GetAllSchedule();
          // console.log(response);
        },
        error: (response: any) => {
          this.toastr.error(response.message);
          // console.log(response);
        },
      });
      this.router.navigate(["/doctor/schedule"])
  }

  showCreateModal() {
    this.doctorService.GetDoctorDetail().subscribe((value) => {
      this.doctorDetail = value;
      this.schedulesRequest.doctorId = this.doctorDetail.doctorId;
    });

  }
  showEditModal(id: any) {
    this.schedulesRequest.id = id;
    this.scheduleService.GetInforSchedule(id).subscribe({
      next: (response: any) => {
        this.schedulesRequest = response.data;
        console.log(response);
      },
    });
  }

  onchangeDate(data:any){
    console.log( data.target.value);
    
  }
}
