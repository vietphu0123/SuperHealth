import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  info: any = {}
  constructor(private route: ActivatedRoute, private doctorService: DoctorService) { }
  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.doctorService.GetDoctorInfoDetail(id).subscribe({
            next: (response) => {
              this.info = response.data
               console.log(this.info)
            }
          })
        }
      }
    })
  }
}
