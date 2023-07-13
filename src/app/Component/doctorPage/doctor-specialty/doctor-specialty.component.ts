import { error, param } from 'jquery';
import { DoctorMainPage } from './../models/DoctorMainPage';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { SpecialtyService } from 'src/app/_service/specialty.service';
import { DoctorList } from 'src/app/Models/doctorList';
import { DoctorSpecialty } from '../models/DoctorSpecialty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-specialty',
  templateUrl: './doctor-specialty.component.html',
  styleUrls: ['./doctor-specialty.component.css']
})
export class DoctorSpecialtyComponent implements OnInit {
  doctorLists: DoctorList[] = [];
  specialtyList: DoctorSpecialty[] =[];

  search = '';
  isFullListDisplayed: boolean = false;
  // searchByDoctor: boolean = true;
  // searchBySpecialty: boolean = true;

  displayCount = 6; //Số lượng sản phẩm hiển thị ban đầu

  showMore() {
    this.displayCount += 4; // tăng giá trị biến để hiển thị thêm sản phẩm

  // Kiểm tra nếu danh sách bác sĩ hiển thị đã đủ
  this.isFullListDisplayed = this.displayCount >= this.doctorLists.length;
  }

  constructor(private doctorService: DoctorService, private specialtyService: SpecialtyService, private router: Router){
    this.GetTopDoctors();
    this.GetSpecialty()
    const params = this.GetRequestParams(this.search);

  }
  ngOnInit(): void {

      // js UI
      var onlineBbookingTabs:any = document.querySelectorAll(".online-booking-tab");
var onlineBbookingLine:any = document.querySelector(".online-booking-line");
var onlineBbookingTabsActive:any = document.querySelector(".online-booking-tab.active");
var onlineBookingImage:any = document.querySelectorAll(".online-booking-img img");

requestIdleCallback(function () {
    onlineBbookingLine.style.top = onlineBbookingTabsActive.offsetTop + "px";
    onlineBbookingLine.style.height = onlineBbookingTabsActive.offsetHeight + "px";
});

onlineBbookingTabs.forEach((tab:any, index:any) => {
    tab.onclick = function () {
        onlineBbookingLine.style.top = this.offsetTop + "px";
        onlineBbookingLine.style.height = this.offsetHeight + "px";
        var a:any = document.querySelector(".online-booking-tab.active");
        a.classList.remove("active")
        var b:any = document.querySelector(".online-booking-img img.active")
        b.classList.remove("active");
        this.classList.add("active");
        onlineBookingImage[index].classList.add("active")
    };
});
var i = 0;
setInterval(() => {
    onlineBbookingLine.style.top = onlineBbookingTabs[i].offsetTop + "px";
    onlineBbookingLine.style.height = onlineBbookingTabs[i].offsetHeight + "px";
    var c:any = document.querySelector(".online-booking-tab.active")
    c.classList.remove("active");
    var d:any = document.querySelector(".online-booking-img img.active")
    d.classList.remove("active");
    onlineBbookingTabs[i].classList.add("active");
    onlineBookingImage[i].classList.add("active")
    ++i;
    if(i>3){
        i=0;
    }
}, 2000);
  }
  GetRequestParams(search: string) {
    let params: any = {}
    if (search) {
      params[`search`] = search;
    }

    return params;
  }

  GetTopDoctors() {
    //doctor
    const params = this.GetRequestParams(this.search);
    this.doctorService.GetTopDoctors(params)
    .subscribe({
      next:(value: any) =>{
        this.doctorLists = value
        console.log(value);

      },
      error:(error)=>{
        console.log(error);

      }
    })
  }

    //specialty
    GetSpecialty() {
    const params = this.GetRequestParams(this.search);

    this.specialtyService.Get(params)
    .subscribe({
      next:(value:any) =>{
        this.specialtyList = value;
        console.log(value);
      },
      error:(error)=>{
        console.log(error);

      }
    })
  }

  handleSearchChange(): void {
    const params = this.GetRequestParams(this.search);
    this.doctorService.GetTopDoctors(params)
      .subscribe({
        next: (value: any) => {
          this.doctorLists = value;
          console.log(value);
          if(this.search){
            this.router.navigate(['/dat-kham/bac-si'], { queryParams: { search: this.search} });
            console.log(this.search)
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  // onKeyPress(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
  //     this.handleSearchChange();

  //     if(this.search){
  //       this.router.navigate(['/dat-kham/bac-si'], { state: { search: this.search } });

  //     }
  //   }
  // }

  // handleSearchChange(): void {

  //   console.log(this.search);
  //   const params = this.GetRequestParams(this.search);
  //   this.GetTopDoctors();

  // }

  // onKeyPress(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     this.GetTopDoctors();
  //   }
  // }
  // handleSearchChange(event: any): void {
  //   this.search = event.target.value;
  //   const params = this.GetRequestParams(this.search);
  // this.doctorService.GetTopDoctors(params)
  //   .subscribe({
  //     next: (value: any) => {
  //       this.doctorLists = value;
  //       console.log(value);

  //       // this.router.navigate(['/doctorList'], { state: { search: this.search, params: params } });
  //       // this.search = event.target.value;
  //       // this.GetTopDoctors();
  //     this.GetTopDoctors();
  //     }
  //   })
  // }



// isSearchByDoctor(): boolean {
//   // Lựa chọn tìm kiếm theo bác sĩ được chọn bởi người dùng
//   return this.searchByDoctor;
// }

// isSearchBySpecialty(): boolean {
//   // Lựa chọn tìm kiếm theo chuyên khoa được chọn bởi người dùng
//   return this.searchBySpecialty;
// }

// searchDoctors(): void {
//   const params = this.GetRequestParams(this.search);

//   this.doctorService.GetTopDoctors(params).subscribe({
//       next: (value: any) => {
//           this.doctorLists = value;
//           console.log(value);
//       },
//       error: (error) => {
//           console.log(error);
//       }
//   });
// }

// searchSpecialties(): void {
//   const params = this.GetRequestParams(this.search);

//   this.specialtyService.Get(params).subscribe({
//       next: (value: any) => {
//           this.specialtyList = value;
//           console.log(value);
//       },
//       error: (error) => {
//           console.log(error);
//       }
//   });
// }


// handleSearchChange(event: any): void {
//   this.search = event.target.value;

//   if (this.isSearchByDoctor()) {
//       this.searchDoctors();
//   } else {
//       this.searchSpecialties();
//   }
// }
}
