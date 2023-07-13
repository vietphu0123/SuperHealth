import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { doctorBooking } from 'src/app/Models/doctorBooking';
import { doctorBookingService } from 'src/app/_service/doctorBooking.service';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.css']
})


export class DoctorBookingComponent implements OnInit {
  data: any
  // doctorBookingDetails: doctorBooking = {
  //   id: '',
  //   doctorName: '',
  //   timeSlot: '',
  //   date: '',
  //   patientName: '',
  //   phoneNumber: '',
  //   dateOfBirth: '',
  //   gender: '',
  //   patientAddress: '',
  //   doctorAddress: '',
  //   reason: '',
  //   bhyt: '',
  //   appointmentCode: '',
  //   avatar: '',
  // }
  doctorBookingDetails: any = {}
  constructor(private route: ActivatedRoute, private doctorBookingService: doctorBookingService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.data = params.get('id');
      }
    })
    console.log(this.data)
    this.doctorBookingService.getAppointmentBookingSuccessById(this.data)
      .subscribe({
        next: (response: any) => {
          this.doctorBookingDetails = response.data[0];
          console.log(this.doctorBookingDetails);

        }
      })
  }

}
