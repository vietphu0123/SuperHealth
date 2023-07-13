import { Component, Input, OnInit } from '@angular/core';
import { ScheduleProfileComponent } from '../schedule-profile.component';
import { appointmentService } from 'src/app/_service/appointment.service';
import { error } from 'jquery';
import { Toast, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduleresult',
  templateUrl: './scheduleresult.component.html',
  styleUrls: ['./scheduleresult.component.css']
})
export class ScheduleresultComponent implements OnInit{
  @Input() dataDetail:any

  constructor(private sheduleProfile:ScheduleProfileComponent,private appoitmentService : appointmentService,private toast:ToastrService ,private router:Router){

  }

  ngOnInit(): void {

  }


  cancelledAppoitment(value :any){
    this.appoitmentService.PatientCancelledAppoitment(value).subscribe((valueAppoitment)=>{
      this.toast.success(valueAppoitment.message);
      window.location.reload();

    },
    error=>{
      this.toast.show(error.message);
    }

    )
  }


}
