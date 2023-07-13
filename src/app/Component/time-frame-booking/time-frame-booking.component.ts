import { Component } from '@angular/core';
import { error } from 'jquery';
import { DataService } from 'src/app/_service/data.service';
import { TimeFrameService } from 'src/app/_service/time-frame.service';

@Component({
  selector: 'app-time-frame-booking',
  templateUrl: './time-frame-booking.component.html',
  styleUrls: ['./time-frame-booking.component.css']
})
export class TimeFrameBookingComponent {
  receivedData: any;
  timeFrameList: any = []

  constructor(private timeFrameService: TimeFrameService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.receivedData = data;
      this.timeFrameService.GetTimeFrameBySchedule(this.receivedData).subscribe({
        next: (response) => {
          if (response.code == 200) {

            this.timeFrameList = response.dataList
            var content = document.querySelector(".appointment-doctor-content");
            if (content?.classList.contains("col-lg-8")) {
              setTimeout(() => {
                var element = document.querySelectorAll(".time-slot>div");
                element.forEach((e) => {
                  e.classList.remove("col-lg-2");
                  e.classList.add("col-lg-3")
                })
              }, 1)
            }
          } else {
            this.timeFrameList = null
          }
          // console.log(this.timeFrameList)
        }
      })
    });
  }
}
