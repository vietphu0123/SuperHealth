import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SpecialtyService } from 'src/app/_service/specialty.service';

@Component({
  selector: 'app-delete-specialty',
  templateUrl: './delete-specialty.component.html',
  styleUrls: ['./delete-specialty.component.css']
})
export class DeleteSpecialtyComponent {
  specialtyForm: FormGroup;
  constructor(private specialtyService: SpecialtyService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DeleteSpecialtyComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.specialtyForm = this.formBuilder.group({
      id: this.data.id,
      specialtyName: this.data.specialtyName,
      image: this.data.image,
      isDelete: this.data.isDelete
    })
  }

  ngOnInit(): void {
    console.log(this.specialtyForm.value)
  }

  closeAddSpecialty() {
    this.dialogRef.close(true)
  }

  DeleteSpecialty() {
    this.specialtyService.UpdateIsDeleteSpecialty(this.specialtyForm.value).subscribe({
      next: (response) => {
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
}
