import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { PatientFileService } from 'src/app/_service/PatientFile.service';

@Component({
  selector: 'app-infor-profile',
  templateUrl: './infor-profile.component.html',
  styleUrls: ['./infor-profile.component.css']
})
export class InforProfileComponent implements OnInit {


  interceptor = axios.interceptors.request.use(config => {

    // Xóa access token và authorization header khỏi config.headers
    delete config.headers['Authorization'];
    delete config.headers['Access-Token'];
    return config;
  });
  addnewData: boolean = false;
  host = "https://provinces.open-api.vn/api/";

  listdata: any = [];
  data: any = {
    address: "",
    appointments: "",
    bhyt: "",
    cmnd: "",
    commune: "",
    communeId: "",
    createdBy: "",
    createdTime: "",
    dateOfBirth: "",
    ethnicity: "",
    gender: 0,
    id: "",
    image: "",
    patient: "",
    patientId: "",
    patientName: "",
    phoneNumber: "",
    relationShip: "",
    status: 0,
    email: "",
    addressCommon: {}

  }


  constructor(private patientFileService: PatientFileService) {

  }
  ngOnInit(): void {

    this.GetPatientFile();
    console.log(this.listdata);
  }
  submitNewData() {
    if (this.addnewData === true) {
      this.addnewData = false;
    }
    else {
      this.addnewData = true;
    }

  }

  submitdata(data: any) {
    this.data = data;
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
      console.log(value)


      this.data = value[0];
      console.log(this.data);
      value.forEach((value: any) => {
        let datatemp: any = {
          address: "",
          appointments: "",
          bhyt: "",
          cmnd: "",
          commune: "",
          communeId: "",
          createdBy: "",
          createdTime: "",
          dateOfBirth: "",
          ethnicity: "",
          gender: 0,
          id: "",
          image: "",
          patient: "",
          patientId: "",
          patientName: "",
          phoneNumber: "",
          relationShip: "",
          status: 0,
          email: "",
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
          datatemp.status = value.status,
          datatemp.email = value.email,
          datatemp.addressCommon = value.addressCommon,

          this.listdata.push(datatemp);

      })
    })
  }

  ConvertPatientName(patientName: string) {
    const splitName = patientName.split(" ");
    const fistName = splitName[0];
    const lastName = splitName.slice(-1)[0];
    return `${lastName[0]}${fistName[0]}`
  }



  callAPI(api: string): void {
    axios.get(api)
      .then((response) => {

      });
  }

  callApiDistrict(api: string): void {
    axios.get(api)
      .then((response) => {

      });
  }

  callApiWard(api: string): void {
    axios.get(api)
      .then((response) => {

      });
  }

}
