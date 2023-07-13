import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { ScheduleService } from 'src/app/_service/schedule.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {
  doctorDetail: any = {
    id: '',
    doctorName: '',
    numberOfExaminations: '',
    positionName: '',
    doctorImage: '',
  }
  scheduleList: any = []

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private scheduleService: ScheduleService,private router:Router) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.doctorService.GetDoctorInfoDetail(id).subscribe({
            next: (response) => {
              // console.log(response);
              this.doctorDetail.id = response.data.id
              this.doctorDetail.doctorImage = response.data.doctorImage
              this.doctorDetail.doctorName = response.data.doctorName
              this.doctorDetail.numberOfExaminations = response.data.numberOfExaminations
              this.doctorDetail.positionName = response.data.positionName
              // console.log(this.doctorDetail)
            }
          })
          // this.scheduleService.GetScheduleByDoctorId(id).subscribe(
          //   response => {
          //     this.scheduleList = response.dataList;
          //     console.log(this.scheduleList)
          //   }
          // )
        }
      }
    })

  }

  bookingDoctor(value : string){
    console.log(value);
    const getUser:string|any =localStorage.getItem('user');
    const localgetUser:any = JSON.parse(getUser);      
    console.log(localgetUser)
      if(localgetUser){
          if (localgetUser.user.role === 'Patient') {
            console.log(localgetUser)
            this.router.navigate([`/doctorList/doctor-info/make-an-appointment/${value}`]);           
        }
      
       
    }
    else{
      console.log("ada");
      localStorage.setItem('idDoctorTemp', value);  
      this.router.navigate(["/login"]);
    }
  }
}
