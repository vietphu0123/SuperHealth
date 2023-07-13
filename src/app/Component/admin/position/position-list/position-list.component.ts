import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { positionService } from 'src/app/_service/position.service';
import { AddEditPositionComponent } from '../add-edit-position/add-edit-position.component';
import { DeletePositionComponent } from '../delete-position/delete-position.component';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent {
  positionList: any = [];
  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  id: string = '';
  constructor(private positionService: positionService, private dialog: MatDialog) {
    this.GetAllPosition()
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
  GetAllPosition() {
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.positionService.GetAllPosition(params).subscribe({
      next: (respone) => {
        console.log(respone.dataList)
        this.positionList = respone.dataList
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
    this.GetAllPosition();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetAllPosition();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetAllPosition();
  }

  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetAllPosition();
  }
  openAddPosition() {
    const dialogRef = this.dialog.open(AddEditPositionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.page = 1
          this.GetAllPosition()
        }
      }
    })
  }
  openDeletePosition(data: any) {
    const dialogRef = this.dialog.open(DeletePositionComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllPosition()
        }
      }
    })
  }

  openEditPosition(data: any) {
    const dialogRef = this.dialog.open(AddEditPositionComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllPosition()
        }
      }
    })
  }
}
