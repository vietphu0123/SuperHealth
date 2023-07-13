import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/_service/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  adminPatientList: any = []

  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  id: string = '';

  patientDetails: Patient = {
  id: '',
  patientName: '',
  phoneNumber: '',
  address: '',
  image: '',
  gender: '',
  dateOfBirth: '',
  bhyt: '',
  cmnd: '',
  userName: '',
  email: '',
  ethnicity: ''
  }




  constructor(private patientServices: PatientService, private dialog: MatDialog) {
    this.GetAllPatient()
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
  GetAllPatient() {
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.patientServices.GetAllPatient(params).subscribe({
      next: (respone) => {
        console.log(respone.dataList)
        this.adminPatientList = respone.dataList
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
    this.GetAllPatient();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetAllPatient();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetAllPatient();
  }

  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetAllPatient();
  }


  //show detail
  openViewPatient(id: any){
  this.patientDetails.id = id;
  this.patientServices.getPatientById(id)
  .subscribe({
    next:(response:any)=>{
      this.patientDetails = response.data[0];
      console.log(response.data[0]);

    }
  })
}

}
