import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientService } from 'src/app/_service/patient.service';


@Component({
  selector: 'app-schedule-profile',
  templateUrl: './schedule-profile.component.html',
  styleUrls: ['./schedule-profile.component.css']
})
export class ScheduleProfileComponent implements OnInit {

    listdata:any = [];
 
    dataCurrent : any ={
      idPatient: '',
      patientName: '',
      patientDOB: '',
      patientNumber: '',
      patientGender: '',
      patientAdress: '',
      appoitmentCode: '',
      appointmentStatus: '',
      timeFrameSlot: '',
      scheduleDay: '',
      scheduleStart: '',
      scheduleEnd:  '',
      doctorId: '',
      doctorName: '',
      doctorAddress: '',
      doctorImage: '',
      stt:'',
      idAppoitment: '',
      appointmentQrcode:''
    }

    constructor(private patientService: PatientService){
      this.GetAppoitmentOfPatientAsync();
      console.log(this.listdata);
    }

    ngOnInit(): void {
      
    }
   
    submitdata(data:any){
      this.dataCurrent = data;
    }

    GetAppoitmentOfPatientAsync(){
      this.patientService.GetAppoitmentOfPatientAsync().subscribe((value)=>{
        if(value){
          this.dataCurrent = value[0];
          value.forEach((element:any)=> {
            
            let data : any ={
              idPatient: '',
              patientName: '',
              patientDOB: '',
              patientNumber: '',
              patientGender: '',
              patientAdress: '',
              appoitmentCode: '',
              appointmentStatus: '',
              timeFrameSlot: '',
              scheduleDay: '',
              scheduleStart: '',
              scheduleEnd:  '',
              doctorId: '',
              doctorName: '',
              doctorAddress: '',
              doctorImage: '',
              stt:'',
              idAppoitment: '',
              appointmentQrcode:''
            }

            data.idPatient=element.idPatientFile;
            data.patientName=element.patientFileName;
            data.patientDOB=element.patientFileDOB;
            data.patientNumber=element.patientFileNumber;
            data.patientGender=element.patientFileGender;
            data.patientAdress=element.patientFileAdress;
            data.appoitmentCode=element.appoitmentCode;
            data.appointmentStatus=element.appointmentStatus;
            data.timeFrameSlot=element.timeFrameSlot;
            data.scheduleDay=element.scheduleDay;
            data.scheduleStart=element.scheduleStart;
            data.doctorId=element.doctorId;
            data.doctorName=element.doctorName;
            data.doctorAddress=element.doctorAddress;
            data.doctorImage=element.doctorImage;
            data.stt=element.stt;
            data.idAppoitment = element.idAppoitment;
            data.appointmentQrcode = element.appointmentQrcode;

            this.listdata.push(element);

          });

           
        }
      })
    }

}
