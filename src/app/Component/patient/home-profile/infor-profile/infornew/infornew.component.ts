import { Component, Input, OnInit } from '@angular/core';
import { ProvinceService } from 'src/app/_service/province.service';
import axios from 'axios';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PatientFileService } from 'src/app/_service/PatientFile.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { InforProfileComponent } from '../infor-profile.component';
@Component({
  selector: 'app-infornew',
  templateUrl: './infornew.component.html',
  styleUrls: ['./infornew.component.css']
})
export class InfornewComponent implements OnInit{
  @Input() currentdata:any={};
  loading:boolean=false;
  validateNewInfor!: FormGroup;
  interceptor = axios.interceptors.request.use(config => {
 
      // Xóa access token và authorization header khỏi config.headers
      delete config.headers['Authorization'];
      delete config.headers['Access-Token'];
    return config;
  });
  host = "https://provinces.open-api.vn/api/";
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  result: string = '';



  constructor(private newInfor:FormBuilder, private province:ProvinceService,private patientFileService:PatientFileService,private toast:ToastrService, private InforProfile:InforProfileComponent){
     
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
      relationShip:['',[Validators.required]],
      cmnd:['',[Validators.required,Validators.pattern]],
      bhyt:[''],
      ethnicity:['']

     })
    this.callAPI('https://provinces.open-api.vn/api/?depth=1');
    console.log(this.currentdata)
  }

  get f(){
    return this.validateNewInfor.controls
  }

  submitForm(){

    if(this.validateNewInfor.valid){
    this.loading=true;
    console.log(this.validateNewInfor.value)
    this.patientFileService.CreatePatientFile((this.validateNewInfor.value)).subscribe(
      (value:any)=>{
        this.loading=false;
        this.toast.success(value.message);
        this.validateNewInfor.reset();
        this.InforProfile.GetPatientFile();
      },
      (error) => {
        this.loading=false;
        this.toast.error("Thêm thất bại");
         
      }
    )
    }
    else{
      this.validateAllFormFields(this.validateNewInfor);
    }
  
    
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


  closetag(){
    this.InforProfile.addnewData=false;
    this.validateNewInfor.reset();
  }

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
