import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpecialtyService } from 'src/app/_service/specialty.service';
import { AddEditSpecialtyComponent } from '../add-edit-specialty/add-edit-specialty.component';
import { DeleteSpecialtyComponent } from '../delete-specialty/delete-specialty.component';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent {
  specialtyList: any = [];
  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  id: string = '';
  loading: boolean = false
  constructor(private specialtyServices: SpecialtyService, private dialog: MatDialog) {
    this.GetAllSpecialty()
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
  GetAllSpecialty() {
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.specialtyServices.GetAllSpecialty(params).subscribe({
      next: (respone) => {
        // console.log(respone.dataList)
        this.specialtyList = respone.dataList
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
    this.GetAllSpecialty();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetAllSpecialty();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetAllSpecialty();
  }

  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetAllSpecialty();
  }
  openAddSpecialty() {
    const dialogRef = this.dialog.open(AddEditSpecialtyComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.page = 1
          this.GetAllSpecialty()
        }
      }
    })
  }
  openDeleteSpecialty(data: any) {
    const dialogRef = this.dialog.open(DeleteSpecialtyComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllSpecialty()
        }
      }
    })
  }

  openEditSpecialty(data: any) {
    const dialogRef = this.dialog.open(AddEditSpecialtyComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllSpecialty()
        }
      }
    })
  }
}
