import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { DoctorInforDetail } from '../models/DoctorInforDetail';
import { DoctorSpecialty } from '../models/DoctorSpecialty';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from '../models/Schedule';
import { Position } from '../models/Position';
import { Router } from '@angular/router';
import { ScheduleService } from 'src/app/_service/schedule/schedule.service';
import { SpecialtyService } from 'src/app/_service/specialty.service';
import { ProvinceService } from 'src/app/_service/province.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import axios from 'axios';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { __values } from 'tslib';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-doctor-profile-setting',
  templateUrl: './doctor-profile-setting.component.html',
  styleUrls: ['./doctor-profile-setting.component.css'],
})
export class DoctorProfileSettingComponent implements OnInit {
  validateNewInfor!: FormGroup;

  valueCurrentData: any;
  doctorDetail: any;
  // doctorDetail: any = {
  //   doctorId: '',
  //   doctorName: '',
  //   phoneNumber: '',
  //   address: '',
  //   avatar: '',
  //   gender: '',
  //   // numberOfExaminations: '',
  //   status: '',
  //   positionId: '',
  //   positionName: '',
  //   dateOfBirth: '',
  //   email: '',
  //   userName: '',
  //   // AddressCommonId: '',
  //   province: '',
  //   district: '',
  //   ward: '',
  //   ngu: '',
  //   addressCommom: {},
  // };
  file: any;
  currentSchedule: Schedule = {
    id: '',
    subTime: '',
    workingDay: '',
    startTime: '',
    endTime: '',
    examinationFee: '',
    status: '',
    doctorId: '',
  };
  genderOptions = [
    { label: 'Nam', value: 'Male' },
    { label: 'Nữ', value: 'Female' },
  ];
  subtimes = ['15 phút', '30 phút', '45 phút'];

  doctorSpecialty: DoctorSpecialty[] = [];
  specialtyDetail: any = {
    specialtyId: '',
    specialtyName: '',
    image: '',
  };

  specialty_Doctor: any = {
    specialtyId: '',
    doctorId: '',
  };
  specialtyList: any = [];
  total: number = 0;
  pageSize: number = 50;
  page: number = 1;
  search = '';
  host = 'https://provinces.open-api.vn/api/';
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  result: string = '';
  loading: boolean = false;
  province: any = '';
  constructor(
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private router: Router,
    private specialtyServices: SpecialtyService,
    private firestogare: AngularFireStorage,
    private newInfor: FormBuilder,
    private accountService:AccountService
  ) {}

  GetRequestParams(search: string, page: number, pageSize: number) {
    let params: any = {};
    if (search) {
      params[`search`] = search;
    }

    if (page) {
      params[`page`] = page;
    }

    if (pageSize) {
      params[`pageSize`] = pageSize;
    }
    return params;
  }
  GetAllSpecialty() {
    const params = this.GetRequestParams(this.search, this.page, this.pageSize);
    this.specialtyServices.GetAllSpecialty(params).subscribe({
      next: (respone) => {
        // console.log(respone.dataList);
        this.specialtyList = respone.dataList;
        this.total = respone.pageSize * respone.totalPage;
        this.pageSize = respone.pageSize;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  DoctorInfor() {
    // this.provinces = [];
    // this.districts = [];
    // this.wards = [];
    this.callAPI('https://provinces.open-api.vn/api/?depth=1');
    this.doctorService.GetDoctorDetail().subscribe((value: any) => {
      console.log(value)
      if (value.addressCommonId != null) {
        this.getDistrict(value.province);
        this.getWard(value.district);
      } else {
        this.callApiDistrict('https://provinces.open-api.vn/api/?depth=1');
        this.callApiWard('https://provinces.open-api.vn/api/?depth=1');
      }
      this.doctorDetail = value;
      console.log(this.doctorDetail);
    });
    this.doctorService.GetInforDoctorSpecialty().subscribe((value) => {
      this.doctorSpecialty = value;
    });
  }

  getDistrict(value: any) {
    let api = `${this.host}p/${value}?depth=2`;
    axios.get(api).then((response) => {
      this.districts = response.data.districts;
    });
  }

  getWard(value: any) {
    let api = `${this.host}d/${value}?depth=2`;
    axios.get(api).then((response) => {
      this.wards = response.data.wards;
    });
  }

  ngOnInit(): void {
    this.validateNewInfor = this.newInfor.group({
      doctorName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      // province: ['', [Validators.required]],
      // district: ['', [Validators.required]],
      // ward: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.DoctorInfor();

    this.GetAllSpecialty();

    // console.log('day la ...');

    // console.log(this.doctorDetail.addressCommon.district);

    // console.log(this.callAPI('https://provinces.open-api.vn/api/?depth=1'));
  }
  get f() {
    return this.validateNewInfor.controls;
  }
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAllAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  async updateDoctorInfor() {
    console.log(this.doctorDetail);

    if (this.file) {
      const uploadTask = this.firestogare.upload(this.file.name, this.file);
      var url: any = await (await uploadTask).ref.getDownloadURL();
      this.doctorDetail.avatar = url;
    }
    this.doctorService
      .UpdateDoctorInfor(this.doctorDetail, this.doctorDetail.doctorId)
      .subscribe({
        next: (response: any) => {
          if (response.code == 500) {
            this.toastr.error(response.message);
          } else if (response.code == 200) {
            this.toastr.success(response.message);
            this.validateNewInfor.reset();
          }
          console.log(response);
          // this.DoctorInfor();
        },
        error: (response: any) => {
          this.toastr.error(response.message);
        },
      });
    if (!this.validateNewInfor.valid) {
      this.validateAllFormFields(this.validateNewInfor);
    }

    // } else{
    //   this.validateAllFormFields(this.validateNewInfor);
    // }
  }

  renderData(array: any[], select: string): void {
    // let row = ' <option disable value="">chọn</option>';
    let row = '';
    array.forEach((element) => {
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
  callAPI(api: string): void {
    axios.get(api).then((response) => {
      this.renderData(response.data, 'province');
      // console.log(response.data);
    });
  }
  callApiDistrict(api: string): void {
    axios.get(api).then((response) => {
      this.renderData(response.data.districts, 'district');
    });
  }

  callApiWard(api: string): void {
    axios.get(api).then((response) => {
      this.renderData(response.data.wards, 'ward');
    });
  }
  // onProvinceChange(data: any): void {
  //   // const selectedProvince = $('#province').val();
  //   this.doctorDetail.province = data.target.value;
  //   this.callApiDistrict(`${this.host}p/${this.doctorDetail.province}?depth=2`);
  //   this.printResult();
  //   console.log(this.doctorDetail.province);
  // }

  // onDistrictChange(data: any): void {
  //   this.doctorDetail.district = data.target.value;
  //   this.callApiWard(`${this.host}d/${this.doctorDetail.district}?depth=2`);
  //   this.printResult();
  //   console.log(this.doctorDetail.district);
  // }
  // onWardChange(data: any): void {
  //   this.doctorDetail.ward = data.target.value;
  //   this.printResult();
  //   console.log(this.doctorDetail.ward);
  // }

  onProvinceChange(): void {
    const selectedProvince = $('#province').val();
    this.callApiDistrict(`${this.host}p/${selectedProvince}?depth=2`);
    this.doctorDetail.district = null;
    this.doctorDetail.ward = null;
    this.printResult();
    // console.log(this.doctorDetail.province);
  }

  onDistrictChange(): void {
    const selectedDistrict = $('#district').val();
    this.callApiWard(`${this.host}d/${selectedDistrict}?depth=2`);
    this.doctorDetail.ward = null;
    this.printResult();
    // console.log(this.doctorDetail.district);
  }

  onWardChange(): void {
    const selectedWard = $('#ward').val();
    this.printResult();
    // this.doctorDetail.addressCommom.ward = selectedWard;
    console.log(selectedWard);
  }

  printResult(): void {
    if (
      $('#district').val() !== '' &&
      $('#province').val() !== '' &&
      $('#ward').val() !== ''
    ) {
      const result =
        $('#province option:selected').text() +
        ' | ' +
        $('#district option:selected').text() +
        ' | ' +
        $('#ward option:selected').text();
      this.result = result;
    }
  }

  onFileSelected(event: any) {
    // const file: File = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   this.doctorDetail.avatar = e.target.result;
    // };
    // reader.readAsDataURL(file);
    this.file = event.target.files[0];
    var fileName: any = URL.createObjectURL(event.target.files[0]);
    this.doctorDetail.avatar = fileName;
  }
  GoSchedule() {
    this.router.navigate(['/doctor/schedule']);
  }
  changeGender(data: any) {
    this.doctorDetail.gender = data.target.value;
    // console.log(data.target.value)
  }

  password: string = '';
  repassword: string = '';

  changePass(form:NgForm) {
    const changePass = {
      password: this.password,
      rePassword: this.repassword,
    };
    this.doctorService.ChangePassword(changePass).subscribe(
      () => {
        this.toastr.success('Thành Công'); 
        // $('#changePassModal').hide();
        // this.accountService.logout();
        // this.router.navigate(['/login']);
      },
      (error) => {
        this.password = '';
        this.repassword = '';
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }
}
