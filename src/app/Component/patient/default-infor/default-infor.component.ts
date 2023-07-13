import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { PatientFileService } from 'src/app/_service/PatientFile.service';
import { ProvinceService } from 'src/app/_service/province.service';

@Component({
  selector: 'app-default-infor',
  templateUrl: './default-infor.component.html',
  styleUrls: ['./default-infor.component.css']
})
export class DefaultInforComponent implements OnInit {
  validateNewInfor!: FormGroup;
  loading = false;
  interceptor = axios.interceptors.request.use(config => {
 
    // Xóa access token và authorization header khỏi config.headers
    delete config.headers['Authorization'];
    delete config.headers['Access-Token'];
  return config;
});
flag= false;
host = "https://provinces.open-api.vn/api/";
provinces: any[] = [];
districts: any[] = [];
wards: any[] = [];
result: string = '';
  constructor(private router:Router, private newInfor:FormBuilder, private province:ProvinceService,private patientFileService:PatientFileService,private toast:ToastrService){
    
  }
  ngOnInit(): void {
    this.validateNewInfor=this.newInfor.group({
      patientName :['',[Validators.required]],
      phoneNumber:['',[Validators.required,Validators.pattern]],
      dateOfBirth:['',[Validators.required]],
      gender:new FormControl('0'),
      province:['',[Validators.required]],
      district:['',[Validators.required]],
      ward:['',[Validators.required]],
      address:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      relationShip:[''],
      cmnd:['',[Validators.required,Validators.pattern]],
      bhyt:[''],
      ethnicity:['']

     })
     this.callAPI('https://provinces.open-api.vn/api/?depth=1');
  }


  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAllAsTouched();
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
  submitForm(){
    console.log('hello')
    if(this.validateNewInfor.valid){
    this.loading=true;
     
    if(this.flag === false){
      this.flag = true;
      this.patientFileService.CreatePatientDefaultFile((this.validateNewInfor.value)).subscribe(
        (value:any)=>{
          this.loading=false;
          this.toast.success(value.message);
          const getUser:string|any =localStorage.getItem('idDoctorTemp');
            if(getUser){
              const value = getUser;
              localStorage.removeItem('idDoctorTemp');
              this.router.navigate([`/doctorList/doctor-info/make-an-appointment/${value}`]); 
            }
            else{
                this.router.navigate(["/doctor/specialty"]);
            }
        },
        (error) => {
          this.loading=false;
          this.toast.error("Thêm thất bại");
          this.flag = false;
           
        }
      )
      }
    }
     
    else{
      console.log('adda')
      this.validateAllFormFields(this.validateNewInfor);
    }
  
    
  }

  // closetag(){
  //   this.InforProfile.addnewData=false;
  //   this.validateNewInfor.reset();
  // }

  callAPI(api: string): void {
    axios.get(api)
      .then((response) => {
        this.renderData(response.data, "province");
      });
  }

  callApiDistrict(api: string): void {
    axios.get(api)
      .then((response) => {
        this.renderData(response.data.districts, "district");
      });
  }

  callApiWard(api: string): void {
    axios.get(api)
      .then((response) => {
        this.renderData(response.data.wards, "ward");
      });
  }

  renderData(array: any[], select: string): void {
    let row = ' <option disable value="">chọn</option>';
    array.forEach(element => {
      row += `<option value="${element.code}">${element.name}</option>`;
    });

    if (select === 'province') {
      this.provinces = array;
    } else if (select === 'district') {
      this.districts = array;
    } else if (select === 'ward') {
      this.wards = array;
    }
  }

  onProvinceChange(): void {
    const selectedProvince = $("#province").val();
    this.callApiDistrict(`${this.host}p/${selectedProvince}?depth=2`);
    this.printResult();
  }

  onDistrictChange(): void {
    const selectedDistrict = $("#district").val();
    this.callApiWard(`${this.host}d/${selectedDistrict}?depth=2`);
    this.printResult();
  }

  onWardChange(): void {
    this.printResult();
  }

  printResult(): void {
    if ($("#district").val() !== "" && $("#province").val() !== "" &&
      $("#ward").val() !== "") {
      const result = $("#province option:selected").text() +
        " | " + $("#district option:selected").text() + " | " +
        $("#ward option:selected").text();
      this.result = result;
    }
  }
}
