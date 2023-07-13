import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';

@Component({
  selector: 'app-change-password-doctor',
  templateUrl: './change-password-doctor.component.html',
  styleUrls: ['./change-password-doctor.component.css']
})
export class ChangePasswordDoctorComponent {
  adminDoctorForm: FormGroup
  username: any
  constructor(private doctorServices: DoctorService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ChangePasswordDoctorComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.adminDoctorForm = this.formBuilder.group({
      Id: this.data.id,
      Password: [null, [Validators.required]],
    })
    this.username = this.data.userName
  }
  get password(): AbstractControl {
    return this.adminDoctorForm.controls['Password'];
  }

  ResetPassword() {
    this.doctorServices.ResetPassword(this.adminDoctorForm.value).subscribe({
      next: (response) => {
        console.log(response)
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

  closeResetPassword() {
    this.dialogRef.close(true)
  }
}