import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Models/Patient';
import { DoctorInforDetail } from '../models/DoctorInforDetail';
import { DoctorSpecialty } from '../models/DoctorSpecialty';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { PatientService } from 'src/app/_service/patient.service';
import { Appointment } from '../../admin/models/appointment';
import { appointmentService } from 'src/app/_service/appointment.service';
import { PatientDetail } from '../models/PatientDetail';

@Component({
  selector: 'app-doctor-patient-list',
  templateUrl: './doctor-patient-list.component.html',
  styleUrls: ['./doctor-patient-list.component.css'],
})
export class DoctorPatientListComponent implements OnInit {
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

  appointment: any = {
    id: '',
    status:''
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
  total: number = 0;
  pageSize: number = 3;
  pageSizes = [3, 6, 9];
  page: number = 1;
  status: number = 0;
  search = '';
  constructor(
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: appointmentService
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
  getAllPatientsApproved() {
    const params = this.GetRequestParams(this.status,this.search, this.page, this.pageSize);

    this.doctorService.GetDoctorDetail().subscribe((value) => {
      this.doctorDetail = value;
      // console.log(value);

      this.patientService
        .getAllPatientsAppointment(this.doctorDetail.doctorId, params)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.patients = response.dataList;
            this.total = response.pageSize * response.totalPage;
            this.pageSize = response.pageSize;
          },
        });
      // this.doctorService.GetInforDoctorSpecialty().subscribe((value) => {
      //   this.doctorSpecialty = value;
      //   // console.log(value);
      // });

      // this.toastr.success("Hi " + this.doctorDetail.doctorName);
    });
  }
  ngOnInit(): void {
     this.getAllPatientsApproved();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllPatientsApproved();
  }
  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.getAllPatientsApproved();
  }
  pageChange(event: number) {
    this.page = event;
    this.getAllPatientsApproved();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getAllPatientsApproved();
  }

  //show detail
  openViewAppointment(id: any) {
    this.appointmentList.id = id;
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (response: any) => {
        this.appointmentDetails = response.data[0];
        console.log(response.data[0]);
      },
    });
  }
}
