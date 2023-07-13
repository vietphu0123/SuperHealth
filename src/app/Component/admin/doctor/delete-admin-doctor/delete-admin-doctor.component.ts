import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from 'src/app/_service/doctor/doctor.service';
import { DeleteSpecialtyComponent } from '../../specialty/delete-specialty/delete-specialty.component';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-admin-doctor',
  templateUrl: './delete-admin-doctor.component.html',
  styleUrls: ['./delete-admin-doctor.component.css']
})
export class DeleteAdminDoctorComponent {
  id: any;
  constructor(private doctorService: DoctorService, private dialogRef: MatDialogRef<DeleteSpecialtyComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.id = this.data.id
  }
  DeleteDoctor() {
    this.doctorService.UpdateIsDeleteDoctor(this.id).subscribe({
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
  closeAddDoctor() {
    this.dialogRef.close(true)
  }
}
