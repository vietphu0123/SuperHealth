import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientFileService } from 'src/app/_service/PatientFile.service';
import { appointmentService } from 'src/app/_service/appointment.service';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent {
  appointment: any = {
    reason: "",
    patientFileId: "",
    timeFrameId: ""
  }
  info: any = {}
  listdata: any = [];
  data: any = {
    address: "--",
    appointments: "--",
    bhyt: "--",
    cmnd: "--",
    commune: "--",
    communeId: "--",
    createdBy: "--",
    createdTime: "--",
    dateOfBirth: "--",
    ethnicity: "--",
    gender: 0,
    id: "--",
    image: "--",
    patient: "--",
    patientId: "--",
    patientName: "--",
    phoneNumber: "--",
    relationShip: "--",
    status: 0,
    addressCommon: {}

  }
  constructor(private router: Router, private route: ActivatedRoute, private doctorService: DoctorService, private patientFileService: PatientFileService, private appointmentService: appointmentService) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.appointment.timeFrameId = id
          this.doctorService.GetInfoByTimeFrame(id).subscribe({
            next: (response) => {
              this.info = response.data
              // console.log(this.info)
            }
          })
        }
      }
    })
    this.GetPatientFile();
    // console.log(this.listdata);
  }
  GetPatientFile() {
    this.patientFileService.GetPatientFile().subscribe((value) => {

      for (var i = 0; i < value.length; i++) {
        var obj = value[i];
        for (var key in obj) {
          if (obj.hasOwnProperty(key) && obj[key] === null && typeof (obj[key]) != typeof (Date)) {
            obj[key] = "--";
          }
        }
      }


      // this.data = value[0];
      value.forEach((value: any) => {
        let datatemp: any = {
          address: "--",
          appointments: "--",
          bhyt: "--",
          cmnd: "--",
          commune: "--",
          communeId: "--",
          createdBy: "--",
          createdTime: "--",
          dateOfBirth: "--",
          ethnicity: "--",
          gender: 0,
          id: "--",
          image: "--",
          patient: "--",
          patientId: "--",
          patientName: "--",
          phoneNumber: "--",
          relationShip: "--",
          status: 0,
          addressCommon: {}

        }

        datatemp.address = value.address,
          datatemp.appointments = value.appointments,
          datatemp.bhyt = value.bhyt,
          datatemp.cmnd = value.cmnd,
          datatemp.commune = value.commune,
          datatemp.communeId = value.communeId,
          datatemp.createdBy = value.createdBy,
          datatemp.createdTime = value.createdTime,
          datatemp.dateOfBirth = value.dateOfBirth,
          datatemp.ethnicity = value.ethnicity,
          datatemp.gender = value.gender,
          datatemp.id = value.id,
          datatemp.image = value.image,
          datatemp.patient = value.patient,
          datatemp.patientId = value.patientId,
          datatemp.patientName = value.patientName,
          datatemp.phoneNumber = value.phoneNumber,
          datatemp.relationShip = value.relationShip,
          datatemp.status = value.status
        datatemp.addressCommon = value.addressCommon,

          this.listdata.push(datatemp);

      })
      setTimeout(() => {
        var list: any = document.querySelectorAll(".patient-info-detail");
        list[0].classList.add("active")
        list[0].click();
        list.forEach((element: any) => {
          element.onclick = () => {
            document.querySelector(".patient-info-detail.active")?.classList.remove("active");
            element.classList.add("active")
          }
        })
        var patientDownbtnList: any = document.querySelectorAll(".patient-info-detail-downbtn");
        var patientDetail: any = document.querySelectorAll(".patient-info-detail-text");
        var patientDetailWrap: any = document.querySelector(".patient-info-wrap");
        patientDownbtnList.forEach((element: any, index: any) => {
          element.onclick = () => {
            patientDetail[index].classList.toggle("active")
            if (patientDetail[index].classList.contains("active")) {
              patientDetailWrap.style.maxHeight = '420px';
            }
            if (!patientDetail[index].classList.contains("active")) {
              patientDetailWrap.style.maxHeight = '280px';
            }
          }
        })

        var patientFile: any = document.querySelector(".patient-more-information-file");
        var patientFileInput: any = document.querySelector(".patient-more-information-file input");
        patientFile.onclick = () => {
          patientFileInput.click();
        }
      }, 1)
    })
    console.log(this.listdata)
  }
  SubmitData(data: any) {
    this.data = data;
    this.appointment.patientFileId = data.id;
    console.log(this.appointment)
  }
  CreateAppointment(note: any) {
    this.appointment.reason = note;
    // console.log(this.appointment)
    this.appointmentService.CreateAppointment(this.appointment).subscribe({
      next: (response) => {
        // console.log(response)
        this.router.navigate(['doctorBooking', response.message])
      }
    })
  }
  ConvertPatientName(patientName: string) {
    const splitName = patientName.split(" ");
    const fistName = splitName[0];
    const lastName = splitName.slice(-1)[0];
    return `${lastName[0]}${fistName[0]}`
  }
}
