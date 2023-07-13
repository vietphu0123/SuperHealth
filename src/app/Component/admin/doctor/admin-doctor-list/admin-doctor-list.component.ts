import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { AddAdminDoctorComponent } from '../add-admin-doctor/add-admin-doctor.component';
import { DeleteAdminDoctorComponent } from '../delete-admin-doctor/delete-admin-doctor.component';
import { ChangePasswordDoctorComponent } from '../change-password-doctor/change-password-doctor.component';
import { EditAdminDoctorComponent } from '../edit-admin-doctor/edit-admin-doctor.component';
import { ViewAdminDoctorComponent } from '../view-admin-doctor/view-admin-doctor.component';

@Component({
  selector: 'app-admin-doctor-list',
  templateUrl: './admin-doctor-list.component.html',
  styleUrls: ['./admin-doctor-list.component.css']
})
export class AdminDoctorListComponent {
  adminDoctorList: any = []
  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  id: string = '';
  constructor(private doctorServices: DoctorService, private dialog: MatDialog) {
    this.GetAllDoctor()
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
  GetAllDoctor() {
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.doctorServices.GetAllDoctor(params).subscribe({
      next: (respone) => {
        console.log(respone.dataList)
        this.adminDoctorList = respone.dataList
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
    this.GetAllDoctor();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetAllDoctor();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetAllDoctor();
  }

  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetAllDoctor();
  }

  openAddDoctor() {
    const dialogRef = this.dialog.open(AddAdminDoctorComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.page = 1
          this.GetAllDoctor()
        }
      }
    })
  }
  openDeleteDoctor(data: any) {
    const dialogRef = this.dialog.open(DeleteAdminDoctorComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllDoctor()
        }
      }
    })
  }

  openResetPassword(data: any) {
    const dialogRef = this.dialog.open(ChangePasswordDoctorComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllDoctor()
        }
      }
    })
  }
  openEditDoctor(data: any) {
    const dialogRef = this.dialog.open(EditAdminDoctorComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.page = 1
          this.GetAllDoctor()
        }
      }
    })
  }
  openViewDoctor(data: any) {
    const dialogRef = this.dialog.open(ViewAdminDoctorComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.page = 1
          this.GetAllDoctor()
        }
      }
    })
  }
}
