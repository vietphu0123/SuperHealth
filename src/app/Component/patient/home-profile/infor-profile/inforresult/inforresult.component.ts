import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InforProfileComponent } from '../infor-profile.component';
import axios from 'axios';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientFileService } from 'src/app/_service/PatientFile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inforresult',
  templateUrl: './inforresult.component.html',
  styleUrls: ['./inforresult.component.css']
})
export class InforresultComponent implements  OnChanges {
  @Input() currentdata:any={};
  dataCurrent:any={};
  validateResultInfor!: FormGroup;
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
  valueCurrentData:any;
  // valueProvince:any[]=[];
  // valueDistrict:any[]=[];
  // valueWard:any[]=[];

  constructor( private resultInfor:FormBuilder,private inforProfileRef:InforProfileComponent,private patientFileService: PatientFileService,private toast:ToastrService){
  }
  ngOnChanges(changes: SimpleChanges) {
     
    
    if(changes['currentdata'] && changes['currentdata'].currentValue){
      this.GetPatientFileDetail();
    }
     
  }



  changedata:boolean=false;

  changeDataSubmit(){
    if(this.changedata===true){
      this.changedata=false;
    }
    else{
      this.changedata=true;
    }

  }


  GetPatientFileDetail(){
    this.patientFileService.GetPatientFileDetail(this.currentdata.id).subscribe((value)=>{
      this.valueCurrentData=null;
      this.valueCurrentData=value;
      this.provinces=[];
      this.districts=[];
      this.wards=[];
       
      this.callAPI('https://provinces.open-api.vn/api/?depth=1');
      // this.valueCurrentData=changes['currentdata'].currentValue;
      this.validateResultInfor=this.resultInfor.group({
        patientName : [this.valueCurrentData.patientName,[Validators.required]],
        phoneNumber:[this.valueCurrentData.phoneNumber,[Validators.required,Validators.pattern]],
        dateOfBirth:[this.valueCurrentData.dateOfBirth.substring(0,10),[Validators.required]],
        gender:new FormControl(this.valueCurrentData.gender.toString()),
        province:['',[Validators.required]],
        district:['',[Validators.required]],
        ward:['',[Validators.required]],
        address:[this.valueCurrentData.address,[Validators.required]],
        email:[this.valueCurrentData.email,[Validators.required,Validators.email]],
        relationShip:[this.valueCurrentData.relationShip,[Validators.required]],
        cmnd:[this.valueCurrentData.cmnd,[Validators.required,Validators.pattern]],
        bhyt:[this.valueCurrentData.bhyt],
        ethnicity:[this.valueCurrentData.ethnicity]
  
       })
       if(this.valueCurrentData.addressCommon.province){
        this.getDistrict(this.valueCurrentData.addressCommon.province);
        this.getWard(this.valueCurrentData.addressCommon.district);
       }
      })
       
  }

  submitCancel(){
    this.inforProfileRef.submitNewData();
  }

  ConvertPatientName(patientName:string){
    const splitName = patientName.split(" ");
    const fistName = splitName[0];
    const lastName = splitName.slice(-1)[0];
    return `${lastName[0]}${fistName[0]}`
  }





  submitValue(){
    if(this.validateResultInfor.valid){
      let valueForm = this.validateResultInfor.value;
      valueForm.id = this.valueCurrentData.id;
       
      console.log(this.validateResultInfor.value)
      this.patientFileService.UpdatePatientFile((valueForm)).subscribe(
        (value:any)=>{
          //this.loading=false;
           
          this.inforProfileRef.GetPatientFile();
          this.GetPatientFileDetail();
          this.changeDataSubmit();
          this.toast.success(value.message);
           
        },
        (error) => {
          //this.loading=false;
          this.toast.success(error.message);
           
        }
      )
      }
      else{
        this.validateAllFormFields(this.validateResultInfor);
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
  getDistrict(value:string){
   
    let api = `${this.host}p/${value}?depth=2`;
    axios.get(api)
      .then((response) => {
        this.districts=response.data.districts;
      });
    
  }

  getWard(value:string){
 
    let api = `${this.host}d/${value}?depth=2`;
    axios.get(api)
      .then((response) => {
        this.wards=response.data.wards
      });
    
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
