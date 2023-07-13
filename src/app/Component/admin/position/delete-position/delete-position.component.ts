import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { positionService } from 'src/app/_service/position.service';

@Component({
  selector: 'app-delete-position',
  templateUrl: './delete-position.component.html',
  styleUrls: ['./delete-position.component.css']
})
export class DeletePositionComponent {
  positionForm: FormGroup;
  constructor(private positionService: positionService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DeletePositionComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.positionForm = this.formBuilder.group({
      id: this.data.id,
      positionName: this.data.positionName,
      // image: this.data.image,
      isDelete: this.data.isDelete
    })
  }

  ngOnInit(): void {
    console.log(this.positionForm.value)
  }

  closeAddPosition() {
    this.dialogRef.close(true)
  }

  DeletePosition() {
    this.positionService.UpdateIsDeletePosition(this.positionForm.value).subscribe({
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
