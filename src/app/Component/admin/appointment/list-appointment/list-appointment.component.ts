import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { doctorBooking } from 'src/app/Models/doctorBooking';
import { appointmentService } from 'src/app/_service/appointment.service';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.css']
})


export class AppointmentListComponent {
  appointmentList: any = [];
  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  id: string = '';


  appointmentDetails: Appointment = {
    id: '',
    doctorName: '',
    timeSlot: '',
    date:  '',
    patientName: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    patientAddress: '',
    doctorAddress: '',
    reason: '',
    bhyt: '',
    appointmentCode: '',
    avatar: '',
    doctorPhoneNumber:''
  }

  constructor(private appointmentService: appointmentService, private dialog: MatDialog) {
    this.GetAllAppointment()
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
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


  GetAllAppointment() {
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.appointmentService.GetAllAppointment(params).subscribe({
      next: (respone) => {
        console.log(respone.dataList)
        this.appointmentList = respone.dataList
        this.total = respone.pageSize * respone.totalPage
        this.pageSize = respone.pageSize
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  pageChange(event: number) {
    this.page = event;
    this.GetAllAppointment();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetAllAppointment();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetAllAppointment();
  }

  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetAllAppointment();
  }


//show detail
openViewAppointment(id: any){
    this.appointmentList.id = id;
    this.appointmentService.getAppointmentById(id)
    .subscribe({
      next:(response:any)=>{
        this.appointmentDetails = response.data[0];
        console.log(response.data);

      }
    })
  }

}

