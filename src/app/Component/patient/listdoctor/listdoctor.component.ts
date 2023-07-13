import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import axios from 'axios';
import { Observable, async } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DoctorList } from 'src/app/Models/doctorList';
import { DoctorListService } from 'src/app/_service/doctorList.service';
import { SpecialtyService } from 'src/app/_service/specialty.service';

@Component({
  selector: 'app-listdoctor',
  templateUrl: './listdoctor.component.html',
  styleUrls: ['./listdoctor.component.css']
})
export class ListdoctorComponent implements OnInit{
  isString(value: any): boolean {
    return typeof value === 'string';
  }



  interceptor = axios.interceptors.request.use(config => {
 
    // Xóa access token và authorization header khỏi config.headers
    delete config.headers['Authorization'];
    delete config.headers['Access-Token'];
  return config;
});


  constructor(private router:Router,private http:HttpClient, private doctorListService:DoctorListService,private specialtyService : SpecialtyService, private route: ActivatedRoute){
    this.getAllDoctor();
    const params = this.GetRequestParams(this.selectedSpecialty);
  }
  searchRadiobutton = ""
  listSpecialty:any =[]
  listSpecialtyClone:any =[]
  doctorLists:any = [];
  selectedSpecialty: string ="";
  search:string ='';
  specialty:string = '';

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      // const specialty = params['specialty'];
      // console.log(search);
      // Gọi phương thức tìm kiếm với các tham số nhận được
      this.onSpecialtyChange(search)
      this.onIconClick(search)
    });

    this.GetAllSpecialty();
    this.GetAllDoctorSpecial();

  }


  makeAppoitment(value:any){
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



  ChangeInput(value : any){
    this.listSpecialtyClone = [];
    if(value===" "){
      this.listSpecialtyClone = this.listSpecialty;
      console.log(this.listSpecialtyClone);
      return
    }
    this.listSpecialty.forEach((valueSpecialty:any)=>{
      if(valueSpecialty.specialtyName.toLowerCase().includes(value.toLowerCase())){
        this.listSpecialtyClone.push(valueSpecialty);

      }
    })

  }



  getAllDoctor() {
    const params = this.GetRequestParams(this.selectedSpecialty);

    this.doctorListService.getAllDoctor(params)
    .subscribe({
      next: (doctorList) => {
        doctorList.forEach(async (item:any)=>{


          if(item.specialties.includes(",")){
            item.specialties = item.specialties.split(',');
          }
          else{
            item.specialties = [item.specialties];
          }

        })
        this.doctorLists=doctorList;
      },
      error: (response) =>{
        console.log(response);
      }
    })
  }


  GetAllSpecialty(){
    this.specialtyService.GetAllSpecialtyList().subscribe((value)=>{
      this.listSpecialty=value;
      this.listSpecialtyClone = this.listSpecialty;
    })
  }

  async GetAllDoctorSpecial(){
    const params = this.GetRequestParams(this.selectedSpecialty);

    console.log(this.selectedSpecialty);
    this.doctorListService.getAllDoctor(params).subscribe((value)=>{
       value.forEach(async (item:any)=>{
        item.province = await this.getProvince(item.province);
        item.district = await this.getDistrict(item.district);
        item.ward = await this.getWard(item.ward);

        if(item.specialties.includes(",")){
          item.specialties = item.specialties.split(',');
        }
        else{
          item.specialties = [item.specialties];
        }

      })
      this.doctorLists=value;
      console.log(this.doctorLists);
    })
  }
  onIconClick(search: string){
    this.search = search;

  const params = this.GetRequestParams( this.search);
    console.log(this.search)
    // const params = this.GetRequestParams(this.search);
    // console.log(this.selectedSpecialty);
    this.doctorListService.getAllDoctor(params)
    .subscribe((value)=>{
    console.log(this.selectedSpecialty);
    // this.doctorListService.getAllDoctor(params).subscribe((value)=>{
 
      value.forEach( async (item:any)=>{
        item.province = await this.getProvince(item.province);
        item.district = await this.getDistrict(item.district);
        item.ward = await this.getWard(item.ward);
        if(item.specialties.includes(",")){
          item.specialties = item.specialties.split(',');
        }
        else{
          item.specialties = [item.specialties];
        }

      })
      console.log(value);
      this.doctorLists=value;
    })
  }

  

  // onIconClick(search: string, specialty: string) {
  //   const params = this.GetRequestParams(search);
  //   console.log(specialty);

  //   this.doctorListService.getAllDoctor(params).subscribe((value) => {
  //     value.forEach((item: any) => {
  //       if (item.specialties.includes(",")) {
  //         item.specialties = item.specialties.split(",");
  //       } else {
  //         item.specialties = [item.specialties];
  //       }
  //     });

  //     console.log(value);
  //     this.doctorLists = value;
  //   });
  // }

  onKeyPress(event: KeyboardEvent, searchEnter: string)
  {

    // this.doctorLists:[] = [];
    this.search = searchEnter;
    if(event.key === 'Enter'){
      const params = this.GetRequestParams(this.search);
console.log(this.search)
    console.log(this.selectedSpecialty);
    this.doctorListService.getAllDoctor(params).subscribe((value)=>{
 
      value.forEach(async (item:any)=>{
        item.province = await this.getProvince(item.province);
        item.district = await this.getDistrict(item.district);
        item.ward = await this.getWard(item.ward);
        if(item.specialties.includes(",")){
          item.specialties = item.specialties.split(',');
        }
        else{
          item.specialties = [item.specialties];
        }

      })
      this.doctorLists=value;

    })
    }
  }
  onSpecialtyChange(search: string) {
    this.selectedSpecialty = search;
    const params = this.GetRequestParams(this.selectedSpecialty);
    console.log(this.selectedSpecialty);
    this.doctorListService.getAllDoctor(params).subscribe((value)=>{
 
      value.forEach(async  (item:any)=>{
        item.province = await this.getProvince(item.province);
        item.district = await this.getDistrict(item.district);
        item.ward = await this.getWard(item.ward);
        if(item.specialties.includes(",")){
          item.specialties = item.specialties.split(',');
        } else {
          item.specialties = [item.specialties];
        }
      });
      this.doctorLists = value;
    });
  }


  // onSpecialtyChange(event: any) {
  //   this.selectedSpecialty = event.target.value;
  //   const params = this.GetRequestParams(this.selectedSpecialty);
  //   console.log(this.selectedSpecialty);
  //   this.doctorListService.getAllDoctor(params).subscribe((value)=>{

  //     value.forEach((item:any)=>{
  //       if(item.specialties.includes(",")){
  //         item.specialties = item.specialties.split(',');
  //       }
  //       else{
  //         item.specialties = [item.specialties];
  //       }

  //     })
  //     this.doctorLists=value;

  //   })

  // }
  GetRequestParams(search: string) {
    let params: any = {}
    if (search) {
      params[`search`] = search;
    }
    return params;
  
  }

  async getProvince(value:string):Promise<any>{
      let province =''
      await axios.get(`https://provinces.open-api.vn/api/p/${value}`).then((value)=>province=value.data.name)
      return province;
    
  }
  async getDistrict(value:string){
    let district =''
      await axios.get(`https://provinces.open-api.vn/api/d/${value}`).then((value)=>district=value.data.name)
      return district;
  }
   async getWard(value:string){
    let ward =''
      await axios.get(`https://provinces.open-api.vn/api/w/${value}`).then((value)=>ward=value.data.name)
      return ward;
  }
}
