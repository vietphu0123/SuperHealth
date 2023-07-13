import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorList } from 'src/app/Models/doctorList';
import { DoctorListService } from 'src/app/_service/doctorList.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  doctorLists: DoctorList[] = [];
  search: string = '';
  isFullListDisplayed: boolean = false;


  constructor(private doctorListService: DoctorListService, private activatedRoute: ActivatedRoute, private router: Router){
    this.getAllDoctor();
    const params = this.GetRequestParams(this.search);

  }
  // ngOnInit(): void {
  //   this.activatedRoute.paramMap.subscribe(params => {
  //     this.search = params.get('search') || '';
  //     this.searchDoctors(this.search);
  //   });
  // }
  GetRequestParams(search: string) {
    let params: any = {}
    if (search) {
      params[`search`] = search;
    }
    return params;
  }

  displayCount = 4; //Số lượng sản phẩm hiển thị ban đầu

  showMore() {
    if (!this.isFullListDisplayed) {
    this.displayCount += 4; // tăng giá trị biến để hiển thị thêm sản phẩm

// Kiểm tra nếu danh sách bác sĩ hiển thị đã đủ
this.isFullListDisplayed = this.displayCount >= this.doctorLists.length;
    }
  }


  getAllDoctor() {
    const params = this.GetRequestParams(this.search);

    this.doctorListService.getAllDoctor(params)
    .subscribe({
      next: (doctorList) => {
        this.doctorLists = doctorList;
        console.log(doctorList);
      },
      error: (response) =>{
        console.log(response);
      }
    })
  }

  handleSearchChange(): void {

    console.log(this.search);
    const params = this.GetRequestParams(this.search);
    this.getAllDoctor();

  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getAllDoctor();
    }
  }
}
