import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { listRecyclePositionService } from 'src/app/_service/RecycleBin/listRecyclePosition.service';

@Component({
  selector: 'app-list-recycle-position',
  templateUrl: './list-recycle-position.component.html',
  styleUrls: ['./list-recycle-position.component.css']
})
export class ListRecyclePositionComponent {
  listRecyclePosition: any = [];

  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  id: string = '';


  constructor(private listRecyclePositionService: listRecyclePositionService, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.GetRecycleBinPosition()
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
  }

  // ngOnInit() {
  //   this.GetRecycleBinPosition()
  //   const params = this.GetRequestParams(this.search, this.page, this.pageSize);
  // }


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
  GetRecycleBinPosition() {
    this.listRecyclePosition= [];
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.listRecyclePositionService.GetRecycleBinPosition(params).subscribe({
      next: (respone) => {
        console.log(respone.dataList)
        this.listRecyclePosition = respone.dataList
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
    this.GetRecycleBinPosition();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetRecycleBinPosition();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetRecycleBinPosition();
  }

  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetRecycleBinPosition();
  }

  RestorePositionById(id: any) {
    this.listRecyclePositionService.RestorePosition(id)
    .subscribe({
      next: (respone: any) => {
        if(respone.code === 200){
          this.toastr.success(respone.message, "", {})
          console.log('Thành công.');
          this.GetRecycleBinPosition();
          this.cdr.detectChanges();
          // location.reload();
        }
        else{
          this.toastr.error(respone.message, "", {})
        }

    },
    error: (error)  => {
      console.log('Thất bại:', error);
    }
  })
  }
}
