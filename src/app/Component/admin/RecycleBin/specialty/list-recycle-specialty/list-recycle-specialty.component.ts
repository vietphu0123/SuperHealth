import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { listRecycleSpecialtyService } from 'src/app/_service/RecycleBin/listRecycleSpecialty.service';

@Component({
  selector: 'app-list-recycle-specialty',
  templateUrl: './list-recycle-specialty.component.html',
  styleUrls: ['./list-recycle-specialty.component.css']
})
export class ListRecycleSpecialtyComponents {
  listRecycleSpecialty: any = [];

  total: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 15, 20]
  page: number = 1;
  search = '';
  id: string = '';


  constructor(private listRecycleSpecialtyService: listRecycleSpecialtyService, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.GetRecycleBinSpecialty()
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


  GetRecycleBinSpecialty() {
    this.listRecycleSpecialty= [];
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.listRecycleSpecialtyService.GetRecycleBinSpecialty(params).subscribe({
      next: (respone) => {
        console.log(respone.dataList)
        this.listRecycleSpecialty = respone.dataList
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
    this.GetRecycleBinSpecialty();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.GetRecycleBinSpecialty();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.GetRecycleBinSpecialty();
  }

  handleSearchChange(event: any): void {
    this.search = event.target.value;
    this.page = 1;
    this.GetRecycleBinSpecialty();
  }

  RestoreSpecialtyById(id: any) {
    this.listRecycleSpecialtyService.RestoreSpecialty(id)
    .subscribe({
      next: (respone: any) => {
        if(respone.code === 200){
          this.toastr.success(respone.message, "", {})
          console.log('Thành công.');
          this.GetRecycleBinSpecialty();
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
