import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { positionService } from 'src/app/_service/position.service';
import { SpecialtyService } from 'src/app/_service/specialty.service';

@Component({
  selector: 'app-edit-admin-doctor',
  templateUrl: './edit-admin-doctor.component.html',
  styleUrls: ['./edit-admin-doctor.component.css']
})
export class EditAdminDoctorComponent {
  adminDoctorForm: FormGroup;
  specialtyList: any = []
  specialtySelected: any = ['a6ec2222-5e67-4adb-956d-08db6e215c0b', '51e94b6e-0f07-454b-88c2-08db81549684'];
  positionList: any = [];
  ngOnInit() {
    this.GetAllSpecialty();
    this.GetAllPosition();
  }

  constructor(private postionService: positionService, private specialtyService: SpecialtyService, private doctorServices: DoctorService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditAdminDoctorComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.adminDoctorForm = this.formBuilder.group({
      Id: data.id,
      DoctorName: [data.doctorName, [Validators.required]],
      PhoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern("(0[3|5|7|8])+([0-9]{8})")]],
      Email: [data.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      PositionId: [data.positionId, [Validators.required]],
      Specialties: [data.specialtyId, [Validators.required]],
    })
    // console.log(this.data)
    // console.log(this.adminDoctorForm.value)
    // this.adminDoctorForm.controls['Specialties'].setValue(this.specialtySelected);
  }

  GetAllPosition() {
    this.postionService.GetAll().subscribe({
      next: (response) => {
        this.positionList = response.dataList
        // console.log(response);

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  GetAllSpecialty() {
    this.specialtyService.GetAllSpecialtyList().subscribe({
      next: (response) => {
        this.specialtyList = response
        console.log(response);

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  get doctorName(): AbstractControl {
    return this.adminDoctorForm.controls['DoctorName'];
  }

  get phoneNumber(): AbstractControl {
    return this.adminDoctorForm.controls['PhoneNumber'];
  }

  get email(): AbstractControl {
    return this.adminDoctorForm.controls['Email'];
  }

  get specialties(): AbstractControl {
    return this.adminDoctorForm.controls['Specialties'];
  }

  get positionId(): AbstractControl {
    return this.adminDoctorForm.controls['PositionId'];
  }

  closeAddDoctor() {
    this.dialogRef.close(true)
  }

  UpdateDoctor() {
    console.log(this.adminDoctorForm.value);
    this.doctorServices.UpdateDoctor(this.adminDoctorForm.value).subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          this.dialogRef.close(true);
          this.toastr.success(response.message, "", {
            progressBar: true,
            closeButton: true
          })
        }
        else {
          this.toastr.error(response.message, "", {
            progressBar: true,
            closeButton: true
          })
        }
      },
      error: (error) => {
        this.toastr.error("Có lỗi")
      }
    })
  }

  // dropDown() {
  //   var ul: any = document.querySelector(".specialty-list>ul");
  //   ul?.classList.toggle("active");
  // }

}
