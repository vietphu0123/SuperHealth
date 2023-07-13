import { NgModule, Component, OnInit, LOCALE_ID, ElementRef, AfterViewInit, ViewChildren, QueryList, ViewChild, Renderer2, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from 'src/app/_service/schedule.service';
import { registerLocaleData } from '@angular/common';

import localeVi from '@angular/common/locales/vi';
import { DataService } from 'src/app/_service/data.service';

registerLocaleData(localeVi);
@Component({
  selector: 'app-quick-booking',
  templateUrl: './quick-booking.component.html',
  styleUrls: ['./quick-booking.component.css']
})


export class QuickBookingComponent {
  scheduleList: any = []
  isDataRendered: boolean = false;
  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService, private dataService: DataService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.scheduleService.GetScheduleByDoctorId(id).subscribe(
            response => {
              this.scheduleList = response.dataList;
              // console.log(response)
              setTimeout(() => {
                var bookappointmentdateli: any = document.querySelectorAll(".book-appointment-date li");
                bookappointmentdateli[0].classList.add("active")
                bookappointmentdateli[0].click();
                var bookappointmentdateliActive: any = document.querySelector(".book-appointment-date li.active");
                var horizontalbar: any = document.querySelector(".book-appointment-date .horizontal-bar")
                requestIdleCallback(function () {
                  horizontalbar.style.left = bookappointmentdateliActive.offsetLeft + "px";
                  horizontalbar.style.width = bookappointmentdateliActive.offsetWidth + "px";
                });

                bookappointmentdateli.forEach((element: any) => {
                  element.onclick = () => {
                    horizontalbar.style.left = element.offsetLeft + "px";
                    horizontalbar.style.width = element.offsetWidth + "px";
                    var b: any = document.querySelector(".book-appointment-date li.active")
                    b.classList.remove("active")
                    element.classList.add("active")
                  }
                });
              }, 1)
            }
          )
        }
      }
    })
    var bookappointmentdate: any = document.querySelector(".book-appointment-date");
    var bookappointmenttime: any = document.querySelector(".book-appointment-time");
    var preBtn: any = document.querySelector(".pre-btn");
    var nextBtn: any = document.querySelector(".next-btn");

    let isDragStart = false, prevPageX: any, preScrollLeft: any

    const dragStart = (e: any) => {
      isDragStart = true;
      prevPageX = e.pageX;
      preScrollLeft = bookappointmentdate.scrollLeft;

    }

    const dragging = (e: any) => {
      if (!isDragStart) return;
      e.preventDefault();
      let positionDiff = e.pageX - prevPageX;
      bookappointmentdate.scrollLeft = preScrollLeft - positionDiff;
    }

    const dragStop = () => {
      isDragStart = false
    }

    bookappointmentdate.addEventListener("mousedown", dragStart);
    bookappointmentdate.addEventListener("mousemove", dragging);
    bookappointmentdate.addEventListener("mouseup", dragStop);

    let pdatkham: any = document.querySelector(".book-appointment>p");
    let isCheckClick = false;
    let downBtn: any = document.querySelector(".control-btn .down-btn");

    pdatkham.onclick = () => {
      downBtn.classList.toggle("active");
      if (downBtn.classList.contains("active")) {
        bookappointmentdate.style.display = "none";
        bookappointmenttime.style.display = "none";
        preBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        bookappointmentdate.style.display = "flex";
        bookappointmenttime.style.display = "block";
        preBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
    }
    downBtn.onclick = () => {
      downBtn.classList.toggle("active");
      if (downBtn.classList.contains("active")) {
        bookappointmentdate.style.display = "none";
        bookappointmenttime.style.display = "none";
        preBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        bookappointmentdate.style.display = "flex";
        bookappointmenttime.style.display = "block";
        preBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
    }

    nextBtn.addEventListener("mousemove", () => {
      bookappointmentdate.style.scrollBehavior = "smooth";
    })

    nextBtn.addEventListener("mouseout", () => {
      bookappointmentdate.style.scrollBehavior = "initial";
    })

    preBtn.addEventListener("mousemove", () => {
      bookappointmentdate.style.scrollBehavior = "smooth";
    })

    preBtn.addEventListener("mouseout", () => {
      bookappointmentdate.style.scrollBehavior = "initial";
    })

    nextBtn.onclick = () => {
      bookappointmentdate.scrollLeft += bookappointmentdate.offsetWidth;
    }

    preBtn.onclick = () => {
      bookappointmentdate.scrollLeft -= bookappointmentdate.offsetWidth;
    }
  }
  sendDataToTimeFrame(id: any) {
    this.dataService.sendData(id)
  }
}
